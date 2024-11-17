import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  imports: [CommonModule]
})
export class ScrollToTopComponent {
  public isVisible: boolean = false; // To control visibility of the button

  // Listen to scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 100; // Show button after scrolling down 300px
  }

  // Scroll to top function
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  }
}