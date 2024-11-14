// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

export interface ProductsList {
  category: string;
  items: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductsList[] = [
    {
      category: "New cars",
      items: [
        { 
          id: 1, 
          name: 'New Car Model A',
          price: 50000, 
          imageUrl: 'assets/images/shop/a.jpg', 
          link: '/new-cars/model-a',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-01'),
        },
        { 
          id: 2, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/e.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: false,
          dateAdded: new Date('2024-02-01'),
        },
        { 
          id: 3, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/c.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-01'),
        },
        { 
          id: 4, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/d.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: false,
          dateAdded: new Date('2024-05-01'),
        },
        { 
          id: 5, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/eight-img.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-08-02'),
        },
        { 
          id: 6, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/three-img.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: false,
          dateAdded: new Date('2024-05-01'),
        },
        { 
          id: 7, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/two-img.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-01'),
        },
        { 
          id: 8, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/f.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-01'),
        },
        { 
          id: 9, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/b.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-01'),
        },
        { 
          id: 10, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/c.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: false,
          dateAdded: new Date('2024-01-01'),
        },
        { 
          id: 11, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/four-img.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-03-05'),
        },
        { 
          id: 12, 
          name: 'New Car Model B',
          price: 55000, 
          imageUrl: 'assets/images/shop/f.jpg', 
          link: '/new-cars/model-b',
          category: 'New cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-01'),
        },
      ]
    },
    {
      category: "Used cars",
      items: [
        { 
          id: 13, 
          name: 'Used Car Model C',
          price: 20000, 
          imageUrl: 'assets/images/shop/us9.png', 
          link: '/used-cars/model-c',
          category: 'Used cars',
          isFeatured: true,
          dateAdded: new Date('2024-01-06'),
        },
        { 
          id: 14, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us1.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-04-06'),
        },
        { 
          id: 15, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us5.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: true,
          dateAdded: new Date('2024-02-01'),
        },
        { 
          id: 16, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us3.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: true,
          dateAdded: new Date('2024-09-01'),
        },
        { 
          id: 17, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us6.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 18, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us4.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 19, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us2.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-04-06'),
        },
        { 
          id: 20, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/usmod.PNG', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: true,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 21, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us8.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 22, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/usfav1.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-05-01'),
        },
        { 
          id: 23, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/us9.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: true,
          dateAdded: new Date('2024-02-01'),
        },
        { 
          id: 24, 
          name: 'Used Car Model D',
          price: 22000, 
          imageUrl: 'assets/images/shop/usfav.png', 
          link: '/used-cars/model-d',
          category: 'Used cars',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
      ]
    },
    {
      category: "Motors",
      items: [
        { 
          id: 26, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/1.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 27, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/2.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 28, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/3.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: true,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 29, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/4.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-06-01'),
        },
        { 
          id: 30, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/5.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: true,
          dateAdded: new Date('2024-04-03'),
        },
        { 
          id: 31, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/6.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 32, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/7.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 33, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/8.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 34, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/9.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: true,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 35, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/10.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2024-09-01'),
        },
        { 
          id: 36, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/11.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: false,
          dateAdded: new Date('2023-04-01'),
        },
        { 
          id: 37, 
          name: 'Motor Model E',
          price: 15000, 
          imageUrl: 'assets/images/shop/12.jpg', 
          link: '/motors/model-e',
          category: 'Motors',
          isFeatured: true,
          dateAdded: new Date('2024-06-01'),
        },
      ]
    },
    {
      category: "Boats",
      items: [
        { 
          id: 38, 
          name: 'Boat Model F',
          price: 30000, 
          imageUrl: 'assets/images/shop/111.jpg', 
          link: '/boats/model-f',
          category: 'Boats',
          isFeatured: false,
          dateAdded: new Date('2024-04-01'),
        },
        { 
          id: 39, 
          name: 'Boat Model F',
          price: 30000, 
          imageUrl: 'assets/images/shop/222.jpg', 
          link: '/boats/model-f',
          category: 'Boats',
          isFeatured: true,
          dateAdded: new Date('2024-06-01'),
        },
        { 
          id: 40, 
          name: 'Boat Model F',
          price: 30000, 
          imageUrl: 'assets/images/shop/333.jpg', 
          link: '/boats/model-f',
          category: 'Boats',
          isFeatured: false,
          dateAdded: new Date('2024-03-01'),
        },
        { 
          id: 42, 
          name: 'Boat Model F',
          price: 30000, 
          imageUrl: 'assets/images/shop/444.jpg', 
          link: '/boats/model-f',
          category: 'Boats',
          isFeatured: true,
          dateAdded: new Date('2024-04-01'),
        },
      ]
    }
  ];

  constructor() {}

  getProducts(): ProductsList[] {
    return this.products;
  }
}