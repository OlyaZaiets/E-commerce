import mongoose, { Document, Schema } from 'mongoose';

export interface OrderItem {
  productId: mongoose.Types.ObjectId;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface OrderType extends Document {
  userId: mongoose.Types.ObjectId;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema ({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: {type: String, required: true},
  price: {type: Number, required: true},
  imageUrl: {type: String, required: true},
  quantity: {type: Number, required: true, min: 1},
  },
  { _id: false }
)

const OrderSchema: Schema = new Schema (
  {
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  orderNumber: {type: String, required: true, unique: true },
  items: {type: [OrderItemSchema], default: [] },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending','paid','shipped','cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<OrderType>('Order', OrderSchema);