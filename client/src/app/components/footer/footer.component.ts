import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = '';

  constructor(private snackBar: MatSnackBar) {}

  submitEmail(): void {
    if (!this.email) {
      this.snackBar.open('Please enter a valid email address.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Here you would typically send the email to your backend service
    // For demonstration, we'll just log it to the console
    console.log('Email submitted:', this.email);

    // Simulate a successful submission
    this.snackBar.open('Email submitted successfully!', 'Close', {
      duration: 3000,
    });

    // Reset the email input
    this.email = '';
  }
}
