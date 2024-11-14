// src/app/components/header/header.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { headerSearchComponent } from '../header-search/headerSearch.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [ProductService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);


  openSearch() {
    this.dialog.open(headerSearchComponent);
  }

  openCart() {
    this.dialog.open(CartComponent);
  }
}