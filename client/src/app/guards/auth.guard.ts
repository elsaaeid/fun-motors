// redirect-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { ToastService } from '../services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  canActivate(): Promise<boolean> {
    return this.authService.loginStatus().toPromise().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.toastService.info("Session expired, please login to continue");
        this.router.navigate(['/login']); // Replace with your login path
        return false;
      }
      return true;
    }).catch(error => {
      console.error(error.message);
      return false;
    });
  }
}