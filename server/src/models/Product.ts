import mongoose, { Schema } from 'mongoose';

export interface ProductType extends Document {
  title: string,
  description: string,
  category: string,
  ingredients: string[],
  price: number,
  imageUrl: string,
  holidayType: string[],
  region: string, 
  tags: string[], 

}

const ProductSchema: Schema = new Schema ({
  title: {type: String, required: true },
  description: {type: String, required: true },
  category:  {type: String, required: true },
  ingredients: { type: [String], default: [] },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  holidayType: { type: [String], default: [] },
  region: { type: String, required: true }, 
  tags: { type: [String], default: [] }, 
})

export default mongoose.model<ProductType>('Product', ProductSchema);