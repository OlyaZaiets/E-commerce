export interface Product {
    _id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  price: number;
  imageUrl: string;
  holidayType: string[];
  region: string;
  tags: string[];
  createdAt: string;
  updatedAt: string; 
}