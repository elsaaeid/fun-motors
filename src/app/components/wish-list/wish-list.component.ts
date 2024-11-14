import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { WishlistService } from '../../services/wish-list.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  imports: [FormsModule, MatDialogModule, CommonModule],
})
export class WishListComponent implements OnInit {
  public wishlistItems: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlistItems();
  }

  loadWishlistItems(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  removeFromWishlist(item: Product): void {
    this.wishlistService.removeFromWishlist(item);
    this.loadWishlistItems(); // Reload wishlist items after removal
  }

  addToCart(item: Product): void {
    // Logic to add the item to the cart
    // This could involve calling a CartService method
    console.log(`Adding ${item.name} to cart`);
  }
}