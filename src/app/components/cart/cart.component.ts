import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [FormsModule, MatDialogModule, CommonModule],
})
export class CartComponent {
  public cartItems: Product[] = [];

  constructor(private cartService: CartService) {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  get totalCount(): number {
    return this.cartService.getTotalCount();
  }
}