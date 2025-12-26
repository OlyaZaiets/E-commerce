import { Request, Response } from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart";
import Product from "../models/Product";
import Order from "../models/Order";

const generateOrderNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORD-${date}-${rand}`;
};

// GET /api/orders
export const getMyOrders = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    // якщо в схемі ще нема status — або додай, або прибери з select
    .select("_id orderNumber totalAmount createdAt status");

  res.json(orders);
};

// GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order id" });
  }

  const order = await Order.findOne({ _id: id, userId });
  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json(order);
};

// POST /api/orders/checkout
export const checkout = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized: please log in." });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId }).session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cart is empty" });
    }

    // витягуємо продукти з БД, щоб ціни були “правдою”
    const productIds = cart.items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } }).session(session);

    const map = new Map(products.map((p) => [p._id.toString(), p]));

    const items = cart.items.map((i) => {
      const p = map.get(i.productId.toString());
      if (!p) throw new Error(`Product not found: ${i.productId}`);

      return {
        productId: p._id,
        title: p.title,
        price: p.price,
        imageUrl: p.imageUrl,
        quantity: i.quantity,
      };
    });

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const orderNumber = generateOrderNumber();
    const [order] = await Order.create(
      [{ userId, orderNumber, items, totalAmount }],
      { session }
    );

    // очищаємо кошик після створення order
    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    res.status(201).json({ orderId: order._id, orderNumber });
  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).json({ message: "Checkout failed", error: error.message || error });
  } finally {
    session.endSession();
  }
};
