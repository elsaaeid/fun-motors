import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  verifyPassword: string = '';

  constructor(private snackBar: MatSnackBar) {}

  submitSignup(): void {
    if (!this.name || !this.email || !this.phone || !this.password || !this.verifyPassword) {
      this.snackBar.open('Please fill in all fields.', 'Close', {
        duration: 3000,
      });
      return;
    }

    if (this.password !== this.verifyPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Here you would typically send the signup data to your backend service
    // For demonstration, we'll just log it to the console
    console.log('Signup Data:', { name: this.name, email: this.email, phone: this.phone, password: this.password });

    // Simulate a successful signup
    this.snackBar.open('You are signed up successfully!', 'Close', {
      duration: 3000,
    });

    // Reset the form
    this.name = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.verifyPassword = '';
  }
}
