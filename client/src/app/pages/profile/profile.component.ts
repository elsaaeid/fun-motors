import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'; // Adjust the path as necessary
import { UserService } from '../../services/user-service/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = { id: '', name: '', email: '', phone: '', createdAt: new Date(), updatedAt: new Date() }; // Initialize user
  isLoading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Check if the user is logged in before loading the profile
  }

  // Check if the user is logged in
// In profile.component.ts
private checkLoginStatus(): void {
  this.authService.isLoggedIn$.subscribe(isLoggedIn => {
    if (isLoggedIn) {
      this.loadUserProfile(); // Load the user profile if logged in
    } else {
      this.errorMessage = 'You are not logged in. Please log in to view your profile.';
      this.isLoading = false;
    }
  });
}

// Load the user's profile
loadUserProfile(): void {
  this.userService.getUserProfile().subscribe({
    next: (data) => {
      this.user = data;
      this.isLoading = false;
    },
    error: (error) => {
      if (error.message === 'No token found, user is not authenticated.') {
        this.errorMessage = 'You are not authorized. Please log in again.';
        // Optionally redirect to login page
        // this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Failed to load user profile.';
      }
      this.isLoading = false;
      console.error('Error loading user profile:', error);
    }
  });
}

  // Update the user's profile
  updateProfile(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          alert('Profile updated successfully!');
        },
        error: (error) => {
          this.errorMessage = 'Failed to update profile.';
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  // Optional: Add a logout method
  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.errorMessage = 'You have been logged out.';
  }
}

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  bootstrap: [ProfileComponent]
})
export class AppModule { }