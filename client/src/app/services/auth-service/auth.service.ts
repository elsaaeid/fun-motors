import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BACKEND_URL } from "../../shared/helper"; // Adjust the path as necessary

export const API_URL = `${BACKEND_URL}/api/users/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = `${API_URL}register`; // URL for registration
  private loginUrl = `${API_URL}login`; // URL for login
  private logoutUrl = `${API_URL}logout`; // URL for logout
  private getUserUrl = `${API_URL}getUser`; // URL for getUserProfile
  private updateUserUrl = `${API_URL}updateUser`; // URL for updateUser
  private loginStatusUrl = `${API_URL}loginStatus`; // URL for loginStatus
  private getUsersUrl = `${API_URL}getUsers`; // URL for getUsers

  private loggedIn = new BehaviorSubject<boolean>(false); // Default is logged out
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  // Log in the user
  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(this.loginUrl, loginData).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token); // Store the token
          this.loggedIn.next(true); // Set logged in state to true on successful login
        } else {
          throw new Error('Login failed, no token received.');
        }
      })
    );
  }

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  // Log out the user
  logout(): Observable<any> {
    return this.http.get(this.logoutUrl).pipe(
      tap(() => {
        this.removeToken(); // Remove the token on logout
        this.loggedIn.next(false); // Set logged in state to false
      })
    );
  }

  // Get the token from localStorage
  private getAuthHeaders() {
    const token = this.getToken(); // Retrieve the token from localStorage
    console.log('Authorization Token:', token); // Log the token for debugging
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });
  }

  // Get the logged-in user's profile
  getUser(): Observable<any> {
    return this.http.get(this.getUserUrl, { headers: this.getAuthHeaders() });
  }

  // Update user information
  updateUser(userData: any): Observable<any> {
    return this.http.patch(this.updateUserUrl, userData, { headers: this.getAuthHeaders() }); // Include headers
  }

  // Delete a user by ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${API_URL}${userId}`, { headers: this.getAuthHeaders() }); // Include headers
  }

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(this.getUsersUrl, { headers: this.getAuthHeaders() }); // Include headers
  }

  // Get login status
  loginStatus(): Observable<any> {
    return this.http.get(this.loginStatusUrl, { headers: this.getAuthHeaders() }); // Include headers
  }

  // Helper methods to manage token
  private setToken(token: string): void {
    if (typeof window !== 'undefined') { // Check if running in a browser
      localStorage.setItem('authToken', token);
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') { // Check if running in a browser
      return localStorage.getItem('authToken');
    }
    return null; // Return null if not in a browser environment
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') { // Check if running in a browser
      localStorage.removeItem('authToken');
    }
  }
}