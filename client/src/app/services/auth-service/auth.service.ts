import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  private loggedIn = new BehaviorSubject<boolean>(false); // Default is logged out
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Example usage of platformId
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Call this method when the user logs in
  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, loginData).pipe(
      tap(() => this.loggedIn.next(true)) // Set logged in state to true on successful login
    );
  }

  // Call this method when the user logs out
  logout(): void {
    this.loggedIn.next(false); // Set logged out state
  }

  // Method to register a new user
  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }
}