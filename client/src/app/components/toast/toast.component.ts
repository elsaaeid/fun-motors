import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  imports: [CommonModule, FormsModule] // Import necessary modules here
})
export class ToastComponent implements OnInit {
  message: string | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe(message => {
      this.message = message;
      setTimeout(() => this.message = null, 3000); // Hide after 3 seconds
    });
  }
}