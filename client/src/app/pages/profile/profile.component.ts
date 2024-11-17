import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'; // Adjust the path as necessary
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = { id: '', name: '', email: '', phone: '', createdAt: new Date(), updatedAt: new Date() }; // Initialize user
  isLoading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = this.authService.getUserId(); // Get the logged-in user's ID from AuthService
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load user profile.';
          this.isLoading = false;
          console.error('Error loading user profile:', error);
        }
      });
    } else {
      this.errorMessage = 'User ID not found.';
      this.isLoading = false;
    }
  }

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