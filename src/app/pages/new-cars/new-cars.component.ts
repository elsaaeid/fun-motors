import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Define the component
@Component({
  selector: 'app-new-cars', // This belongs to the component decorator
  templateUrl: './new-cars.component.html',
  styleUrls: ['./new-cars.component.scss'],
})
export class NewCarsComponent implements OnInit {
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load products from the ProductService
  private loadProducts(): void {
    const productsList = this.productService.getProducts();
    const newCarsCategory = productsList.find(category => category.category === 'New cars');
    this.allProducts = newCarsCategory ? newCarsCategory.items : []; // Get items from the New cars category
    this.filteredProducts = [...this.allProducts]; // Initialize filtered products
  }

  // Handle search input
  public onSearch(): void {
    this.filteredProducts = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.selectedOrganize = ''; // Reset organization selection when searching
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
    NewCarsComponent, // Declare the component here
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ensure FormsModule is imported here
  ],
  bootstrap: [NewCarsComponent] // Bootstrap the component if this is the main module
})
export class AppModule { } // Or whatever your main module is called