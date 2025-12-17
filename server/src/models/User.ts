import mongoose, { Schema, Document } from 'mongoose';

export interface Address {
  _id?: mongoose.Types.ObjectId;
  country: string;
  postalCode: string;
  region: string;
  city: string;
  street: string;
  building: string;
  isDefault: boolean;
}

export interface UserType extends Document {
  fullName: string,
  email: string, 
  password: string,
  phone: string,
  // country: string, 
  role: 'user' | 'admin',
  wishlist: mongoose.Types.ObjectId[];
  addresses: Address[]; 
  createdAt: Date,
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    country: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    building: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: true },
  },
  { _id: true }
);




const UserSchema: Schema = new Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true,  
    minlength: [2, 'Name must contain at least 2 characters']},
  email: {
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
  }, 
  password: {
    type: String, 
    required: true,
    minlength: [6, 'Password must be at least 6 characters'] 
  },
  phone: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^\+?[0-9]{6,15}$/, 'Invalid phone number'],
  },
  // country: { 
  //   type: String, 
  //   required: true }, 


  role: {
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user'
  },
  gender: {
  type: String,
  enum: ['male', 'female', 'other', ''],
  default: ''
  },
  birthday: {
    day: {type: String, default: '' },
    month: {type: String, default: '' },
    year: {type: String, default: '' },
  },

  wishlist: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    }
  ],

  addresses: { type: [AddressSchema], default: [] },


},  { timestamps: true })

export default mongoose.model<UserType>('User', UserSchema)