import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service/product.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service/cart-service';
import { WishlistService } from '../../services/wishlist-service/wish-list.service';
import { RouterModule } from '@angular/router';

// Define the component
@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.scss'],
})
export class BoatsComponent implements OnInit {
  public allProducts: Product[] = [];      // Array to hold all products
  public filteredProducts: Product[] = []; // Array to hold filtered products
  public searchTerm: string = '';          // Search term for filtering
  public selectedOrganize: string = '';    // Selected organization option
  public selectedColor: string = 'all';   
  public lists: string[] = [
    'السعر الاعلى للسعر الاقل', 
    'السعر الاقل للسعر الاعلى', 
    'المميز', 
    'الاحدث'
  ]; // Filter options
  public colors: string[] = ['red', 'blue', '#074d7f', 'grey', "#4c3f33", '#d6d5da', 'white',];
  
  public modalImage: string = ''; // To hold the image URL for the modal
  public modalCaption: string = ''; // To hold the caption for the modal
  public isModalOpen: boolean = false; // To control modal visibility

  constructor(
    private productService: ProductService, 
    private cartService: CartService, 
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load products from the ProductService
  private loadProducts(): void {
    const productsList = this.productService.getProducts();
    const boatsCategory = productsList.find(category => category.category === 'Boats');
    this.allProducts = boatsCategory ? boatsCategory.items : [];
    this.filteredProducts = [...this.allProducts];
  }

  // Handle search input
  public onSearch(): void {
    this.filteredProducts = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.selectedOrganize = ''; // Reset organization selection when searching
  }
// Filter by colors 
public onColorChange(color: string): void {
  this.selectedColor = color;
  this.applyFilters();
}

private applyFilters(): void {
  this.filteredProducts = this.allProducts.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesColor = this.selectedColor === 'all' || product.color === this.selectedColor;
    return matchesSearchTerm && matchesColor;
  });
}


  // Add product to cart
  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // Add product to wishList
  public addToWishlist(product: Product): void {
    this.wishlistService.addToWishlist(product);
  }

  // Check if the product is in the cart
  public isProductInCart(product: Product): boolean {
    return this.cartService.isProductInCart(product);
  }

  // Increase quantity of the product
  public increaseQuantity(item: Product): void {
    item.quantity!++; // Use non-null assertion since we expect quantity to be defined
    this.cartService.updateCartItem(item);
  }
  
  // Decrease quantity of the product
  public decreaseQuantity(item: Product): void {
    if (item.quantity! > 1) {
      item.quantity!--; // Decrement quantity
      this.cartService.updateCartItem(item);
    } else {
      this.removeFromCart(item); // Remove item if quantity is 1
    }
  }

  // Remove product from cart
  public removeFromCart(item: Product): void {
    this.cartService.removeFromCart(item);
  }

  // Handle organization change
  public onOrganizeChange(): void {
    let sortedProducts = [...this.filteredProducts];

    switch (this.selectedOrganize) {
      case 'السعر الاعلى للسعر الاقل':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'السعر الاقل للسعر الاعلى':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'المميز':
        sortedProducts = sortedProducts.filter(product => product.isFeatured);
        break;
      case 'الاحدث':
        sortedProducts.sort((a, b) => (b.dateAdded ? b.dateAdded.getTime() : 0) - (a.dateAdded ? a.dateAdded.getTime() : 0));
        break;
      default:
        sortedProducts = [...this.allProducts];
        break;
    }

    this.filteredProducts = sortedProducts;
  }

  // Open modal with the selected image
  public openModal(imageUrl: string, caption: string): void {
    this.modalImage = imageUrl;
    this.modalCaption = caption;
    this.isModalOpen = true;
  }

  // Close the modal
  public closeModal(): void {
    this.isModalOpen = false;
  }
}

// Define the module
@NgModule({
  declarations: [
    BoatsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ],
  bootstrap: [BoatsComponent]
})
export class AppModule { }