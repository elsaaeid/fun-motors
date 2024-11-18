import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    phone: ''
  };
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserProfile();
  }
  loadUserProfile() {
    this.authService.getUser().subscribe({
      next: (response) => {
        this.user = response; // Assuming response contains user data
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user profile', error);
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized access. Please log in.';
          this.router.navigate(['/login']); // Redirect to login page
        } else {
          this.errorMessage = 'Failed to load user profile. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }

  updateProfile() {
    this.authService.updateUser(this.user).subscribe({
      next: (response) => {
        console.log('Profile updated successfully', response);
        // Optionally, you can show a success message or redirect
      },
      error: (error) => {
        console.error('Error updating profile', error);
        this.errorMessage = 'Failed to update profile. Please try again.';
      }
    });
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