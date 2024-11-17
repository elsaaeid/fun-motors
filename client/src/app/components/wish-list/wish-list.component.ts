import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { WishlistService } from '../../services/wishlist-service/wish-list.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service/cart-service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  imports: [FormsModule, MatDialogModule, CommonModule],
})
export class WishListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public wishlistItems: Product[] = [];

  constructor(private wishlistService: WishlistService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadWishlistItems();
  }
  
  closeDialog(): void {
    // Close the search dialog
    this.dialog.closeAll(); // This will close all open dialogs
  }

  loadWishlistItems(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  removeFromWishlist(item: Product): void {
    this.wishlistService.removeFromWishlist(item);
    this.loadWishlistItems(); // Reload wishlist items after removal
  }

  addToWishlist(item: Product): void {
    // Check if the item is already in the wishlist
    const exists = this.wishlistItems.some(wishlistItem => wishlistItem.id === item.id);
    
    if (!exists) {
      this.wishlistService.addToWishlist(item); // Add item to wishlist
      this.loadWishlistItems(); // Reload wishlist items to reflect the change
      console.log(`${item.name} has been added to the wishlist.`);
    } else {
      console.log(`${item.name} is already in the wishlist.`);
    }
  }
  public addToCart(product: Product): void {
    this.cartService.addToCart(product); // Call the service to add the product to the cart
  }
}