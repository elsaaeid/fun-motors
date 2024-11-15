import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity!++; // Increment quantity if product already exists
    } else {
      product.quantity = 1; // Initialize quantity for new product
      this.cartItems.push(product);
    }
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  isProductInCart(product: Product): boolean {
    return this.cartItems.some(item => item.id === product.id); // Check if product is in cart
  }

  updateCartItem(updatedProduct: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === updatedProduct.id);
    if (existingProduct) {
      existingProduct.quantity = updatedProduct.quantity; // Update quantity
    }
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  getCartTotalCount(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}