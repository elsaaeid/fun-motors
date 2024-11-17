import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service/cart-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../../components/cart/cart.component';
import { ProductService } from '../../services/product-service/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [ProductService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  readonly dialog = inject(MatDialog);
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
    // Check if all shipping information fields are filled
    if (!this.shippingInfo.name || !this.shippingInfo.address || !this.shippingInfo.city || !this.shippingInfo.postalCode || !this.shippingInfo.country) {
      alert('Please fill in all shipping information fields.');
      return; // Stop the submission if any field is empty
    }

    // Here you would typically handle the payment processing
    console.log('Processing payment for:', this.shippingInfo);
    
    // After processing, clear the cart
    this.cartService.clearCart();
    this.router.navigate(['/thank-you']); // Navigate to a thank you page or confirmation
  }

  openCart(): void {
    this.dialog.open(CartComponent);
  }
}

@NgModule({
  declarations: [
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  bootstrap: [CheckoutComponent]
})
export class AppModule { }