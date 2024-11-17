import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service'; // Import AuthService
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService) {}

  submitLogin(): void {
    if (!this.email || !this.password) {
      this.snackBar.open('Please fill in all fields.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    // Send the login data to the backend
    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.snackBar.open('You are logged in successfully!', 'Close', {
          duration: 3000,
        });
        // Optionally, navigate to a different route after successful login
        this.router.navigate(['/home']); // Change to your desired route
      },
      error: (error) => {
        // Handle specific error messages
        if (error.error && error.error.message) {
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 3000,
          });
        }
        console.error('Login error:', error);
      }
    });
  }
}