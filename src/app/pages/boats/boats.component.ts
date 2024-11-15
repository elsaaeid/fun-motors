import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { WishlistService } from '../../services/wish-list.service';
import { RouterModule } from '@angular/router';



// Define the component
@Component({
  selector: 'app-boats', // Updated selector to reflect boats
  templateUrl: './boats.component.html', // Updated template URL
  styleUrls: ['./boats.component.scss'],
})
export class BoatsComponent implements OnInit { // Updated class name
  public allProducts: Product[] = [];      // Array to hold all products
  public filteredProducts: Product[] = []; // Array to hold filtered products
  public searchTerm: string = '';          // Search term for filtering
  public selectedOrganize: string = '';    // Selected organization option
  public lists: string[] = [
    'السعر الاعلى للسعر الاقل', 
    'السعر الاقل للسعر الاعلى', 
    'المميز', 
    'الاحدث'
  ]; // Filter options
  
  public modalImage: string = ''; // To hold the image URL for the modal
  public modalCaption: string = ''; // To hold the caption for the modal
  public isModalOpen: boolean = false; // To control modal visibility

  constructor(private productService: ProductService, private cartService: CartService, private wishlistService: WishlistService,) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load products from the ProductService
  private loadProducts(): void {
    const productsList = this.productService.getProducts();
    const boatsCategory = productsList.find(category => category.category === 'Boats'); // Updated category to 'Boats'
    this.allProducts = boatsCategory ? boatsCategory.items : []; // Get items from the Boats category
    this.filteredProducts = [...this.allProducts]; // Initialize filtered products
  }

  // Handle search input
  public onSearch(): void {
    this.filteredProducts = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.selectedOrganize = ''; // Reset organization selection when searching
  }

  
  // Add product to cart
  public addToCart(product: Product): void {
    this.cartService.addToCart(product); // Call the service to add the product to the cart
  }
  
    // Add product to wishList
    public addToWishlist(product: Product): void {
    this.wishlistService.addToWishlist(product); // Call the service to
  }

  // Handle organization change
  public onOrganizeChange(): void {
    let sortedProducts = [...this.filteredProducts]; // Create a copy for sorting

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
        sortedProducts = [...this.allProducts]; // Reset to original product list if no filter is selected
        break;
    }

    this.filteredProducts = sortedProducts; // Update filtered products
  }

  // Filter products based on the selected criteria
  public filterProducts(criteria: string): void {
    if (criteria === '*') {
      this.loadProducts(); // Load all products
    } else {
      this.onOrganizeChange(); // Apply the selected organization filter
    }
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
    BoatsComponent, // Updated declaration to reflect boats component
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ],
  bootstrap: [BoatsComponent] // Bootstrap the component if this is the main module
})
export class AppModule { } // Or whatever your main module is called