// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  link: string;
  category: string; // Add this line to include the category
  isFeatured?: boolean; // Indicates if the product is featured (for "المميز" filter)
  dateAdded?: Date;   // Date when the product was added (for "الاحدث" filter)
}