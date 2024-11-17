import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model'; // Adjust the path as necessary
import { API_URL } from '../auth-service/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  private getUserProfileUrl = `${API_URL}getUser`; // URL for getUserProfile
  private updateUserUrl = `${API_URL}updateUser`; // URL for updateUser
  private getUsersUrl = `${API_URL}getUsers`; // URL for getUsers
  
  
  /**
   * Get a user by ID
   * @returns An observable of the user data
   */  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.getUserProfileUrl); // Call the correct endpoint
  }


  /**
   * Update user information
   * @param user - The user object containing updated information
   * @returns An observable of the updated user data
   */  // Get the logged-in user's profile

  // Update user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.updateUserUrl, user);
  }

  /**
   * Delete a user by ID
   * @param userId - The ID of the user to delete
   * @returns An observable indicating completion
   */
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}${userId}`);
  }

  /**
   * Get all users (optional, if needed)
   * @returns An observable of an array of users
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl);
  }
}