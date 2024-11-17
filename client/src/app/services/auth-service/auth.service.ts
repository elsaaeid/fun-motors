import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BACKEND_URL } from "../../shared/helper"; // Adjust the path as necessary
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private http: HttpClient,) {}


  // Log in the user
login(loginData: { email: string; password: string }): Observable<any> {
  return this.http.post<{ token: string }>(this.loginUrl, loginData).pipe(
    tap(response => {
      if (response.token) {
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
  return this.http.get(this.logoutUrl);
}

// Get the logged-in user's profile
getUser(): Observable<any> {
  return this.http.get(this.getUserUrl);
}

// Update user information
updateUser(userData: any): Observable<any> {
  return this.http.patch(this.updateUserUrl, userData);
}

// Delete a user by ID
deleteUser(userId: string): Observable<any> {
  return this.http.delete(`${API_URL}/${userId}`);
}

// Get all users
getUsers(): Observable<any> {
  return this.http.get(this.getUsersUrl);
}

// Get login status
loginStatus(): Observable<any> {
  return this.http.get(this.loginStatusUrl);
}
}