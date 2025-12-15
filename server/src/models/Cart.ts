import mongoose, { Schema } from 'mongoose';

export interface CartType extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}

const CartSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
    items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    }
  ]
}, 
{ timestamps: true }
);

export default mongoose.model<CartType>('Cart', CartSchema);