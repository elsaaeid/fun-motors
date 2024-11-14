import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];

  constructor() {}

  getWishlistItems(): Product[] {
    return this.wishlist;
  }

  addToWishlist(product: Product): void {
    if (!this.wishlist.find(item => item.id === product.id)) {
      this.wishlist.push(product);
    }
  }

  removeFromWishlist(product: Product): void {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
  }

  // New method to get the total count of wishlist items
  getWishListTotalCount(): number {
    return this.wishlist.length;
  }
}