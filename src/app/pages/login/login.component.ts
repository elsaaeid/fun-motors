import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private snackBar: MatSnackBar) {}

  submitLogin(): void {
    if (!this.name || !this.email || !this.password) {
      this.snackBar.open('Please fill in all fields.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Here you would typically send the login data to your backend service
    // For demonstration, we'll just log it to the console
    console.log('Login Data:', { name: this.name, email: this.email, password: this.password });

    // Simulate a successful login
    this.snackBar.open('You are logged in successfully!', 'Close', {
      duration: 3000,
    });

    // Reset the form
    this.name = '';
    this.email = '';
    this.password = '';
  }
}
