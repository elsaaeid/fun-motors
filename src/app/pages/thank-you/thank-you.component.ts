import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  public message: string = "Thank you for your purchase! We appreciate your business.";

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home page or adjust the route as necessary
  }
}