import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];

  constructor() {}

  // Get all wishlist items
  getWishlistItems(): Product[] {
    return this.wishlist;
  }

  // Add a product to the wishlist if it doesn't already exist
  addToWishlist(product: Product): void {
    if (!this.wishlist.some(item => item.id === product.id)) {
      this.wishlist.push(product);
      console.log(`${product.name} has been added to the wishlist.`);
    } else {
      console.log(`${product.name} is already in the wishlist.`);
    }
  }

  // Remove a product from the wishlist
  removeFromWishlist(product: Product): void {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
    console.log(`${product.name} has been removed from the wishlist.`);
  }

  // Get the total count of wishlist items
  getWishListTotalCount(): number {
    return this.wishlist.length;
  }
}