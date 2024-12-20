// src/app/components/header-search/headerSearch.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ProductService, ProductsList } from '../../services/product-service/product.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';



@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [FormsModule, MatDialogModule, CommonModule],
  templateUrl: './headerSearch.component.html',
  styleUrls: ['./headerSearch.component.scss']
})
export class headerSearchComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  productCategories: ProductsList[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All'; // Default to 'All'
  categories: string[] = ['All', 'New cars', 'Used cars', 'Motors', 'Boats']; // Example categories

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productCategories = this.productService.getProducts();
    this.filterProducts(); // Initialize with all products
  }

  closeDialog(): void {
    // Close the search dialog
    this.dialog.closeAll(); // This will close all open dialogs
  }


  onSearch(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  private filterProducts(): void {
    this.filteredProducts = []; // Reset filtered products
    this.productCategories.forEach(category => {
      if (this.selectedCategory === 'All' || category.category === this.selectedCategory) {
        const filteredItems = category.items.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.filteredProducts.push(...filteredItems);
      }
    });
  }
}