import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router'; // Import Router for navigation
import { CartService } from '../../services/cart-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  public cartItems: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(item: Product): void {
    item.quantity!++; // Use non-null assertion since we expect quantity to be defined
    this.cartService.updateCartItem(item);
  }

  decreaseQuantity(item: Product): void {
    if (item.quantity! > 1) {
      item.quantity!--; // Decrement quantity
      this.cartService.updateCartItem(item);
    } else {
      this.removeFromCart(item); // Optionally remove item if quantity is 1
    }
  }

  removeFromCart(item: Product): void {
    this.cartService.removeFromCart(item);
    this.loadCartItems(); // Reload cart items after removal
  }

  get totalCount(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  // Implement the calculateTotalPrice method
  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  // Implement the checkout method
  checkout(): void {
    // Navigate to the checkout page or perform checkout logic
    this.router.navigate(['/checkout']); // Adjust the route as necessary
  }
}