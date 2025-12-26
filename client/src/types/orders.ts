export type OrderItem = {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type OrderHistoryItem = {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  createdAt: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
};

export type OrderDetails = OrderHistoryItem & {
  items: OrderItem[];
};
