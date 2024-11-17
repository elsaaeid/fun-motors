// toast.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<string>();
  toastState$ = this.toastSubject.asObservable();

  info(message: string) {
    this.toastSubject.next(message);
  }
}