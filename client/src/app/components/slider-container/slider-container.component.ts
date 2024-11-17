import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider-container',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.scss']
})
export class SliderContainerComponent {
  itemsPerSlide = 5;
  myInterval = 1500;
  activeSlideIndex = 0;

  // Define the slides property
  slides = [
    {
      image: 'assets/images/shop/one-img.jpg',
    },
    {
      image: 'assets/images/shop/two-img.jpg',
    },
    {
      image: 'assets/images/shop/three-img.jpg',
    },
    {
      image: 'assets/images/shop/four-img.jpg',
    },
    {
      image: 'assets/images/shop/five-img.jpg',
    },
    {
      image: 'assets/images/shop/six-img.jpg',
    },
    {
      image: 'assets/images/shop/seven-img.jpg',
    },
    {
      image: 'assets/images/shop/eight-img.jpg',
    },
    {
      image: 'assets/images/shop/nine-img.jpg',
    },
    {
      image: 'assets/images/shop/ten-img.jpg',
    },
    // Add more slides as needed
  ];
}