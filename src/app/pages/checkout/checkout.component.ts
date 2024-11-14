import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public cartItems: Product[] = [];
  public shippingInfo = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };
  public totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotal();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  onSubmit(): void {
    // Here you would typically handle the payment processing
    console.log('Processing payment for:', this.shippingInfo);
    // After processing, you might want to clear the cart
    this.cartService.clearCart();
    this.router.navigate(['/thank-you']); // Navigate to a thank you page or confirmation
  }
}