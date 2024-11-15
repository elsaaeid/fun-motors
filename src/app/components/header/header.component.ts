import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service';
import { headerSearchComponent } from '../header-search/headerSearch.component';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishlistService } from '../../services/wish-list.service';
import {MatBadgeModule} from '@angular/material/badge';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
  ],
  providers: [ProductService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  public cartItems: Product[] = [];
  private WishlistService = inject(WishlistService); // Inject WishlistService

  constructor(private cartService: CartService) {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  openSearch(): void {
    this.dialog.open(headerSearchComponent);
  }

  openCart(): void {
    this.dialog.open(CartComponent);
  }
  
  openWishList(): void {
    this.dialog.open(WishListComponent);
  }

  get cartTotalCount(): number {
    return this.cartService.getCartTotalCount();
  }

  // New method to get the total count of wishlist items
  get wishlistCount(): number {
    return this.WishlistService.getWishListTotalCount();
  }
}