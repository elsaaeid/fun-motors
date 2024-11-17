import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model'; // Adjust the path as necessary
import { BACKEND_URL } from "../../shared/helper"; // Adjust the path as necessary
import { isPlatformBrowser } from '@angular/common';

export const API_URL = `${BACKEND_URL}/api/users/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = `${API_URL}register`; // URL for registration
  private loginUrl = `${API_URL}login`; // URL for login
  private getUserProfileUrl = `${API_URL}getUser`; // URL for getUserProfile
  private updateUserUrl = `${API_URL}updateUser`; // URL for updateUser
  private loginStatusUrl = `${API_URL}loginStatus`; // URL for loginStatus
  
  private loggedIn = new BehaviorSubject<boolean>(false); // Default is logged out
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    // get loginStatus
  getLoginStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.loginStatusUrl);
  }
  // Check if the platform is a browser
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Log in the user
login(loginData: { email: string; password: string }): Observable<any> {
  return this.http.post<{ token: string }>(this.loginUrl, loginData).pipe(
    tap(response => {
      if (response.token) {
        localStorage.setItem('token', response.token); // Store the token
        this.loggedIn.next(true); // Set logged in state to true on successful login
      } else {
        throw new Error('Login failed, no token received.');
      }
    })
  );
}
  // Log out the user
  logout(): void {
    this.loggedIn.next(false); // Set logged out state
    localStorage.removeItem('token'); // Remove token on logout
  }

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  // Get the logged-in user's profile
  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });
    return this.http.get<User>(this.getUserProfileUrl, { headers }); // Call the correct endpoint
  }

  // Update user information
  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });
    return this.http.put<User>(this.updateUserUrl, user, { headers }); // Call the correct endpoint
  }
}