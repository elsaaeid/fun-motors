import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { CommonModule } from '@angular/common';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-show-room',
  standalone: true,
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.scss'],
  imports: [
    MatCheckboxModule, 
    FormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowRoomComponent {
  readonly task = signal<Task>({
    name: 'Checking All Features',
    completed: false,
    subtasks: [
      { name: 'Steering Adjustment', completed: true },
      { name: 'A/C', completed: false },
      { name: 'Adjustable Seats', completed: false },
      { name: 'Cigarette Lighter', completed: false },
      { name: 'Heater', completed: false },
      { name: 'Power Steering', completed: false },
      { name: 'Bluetooth', completed: false },
      { name: 'GPS', completed: false },
      { name: 'Sunroof', completed: false },
    ],
  });

  description: string = '';
  selectedFile: File | null = null;

  constructor(private snackBar: MatSnackBar) {}

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return { ...task };
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitForm(): void {
    if (!this.description || !this.selectedFile) {
      this.snackBar.open('Please fill in all fields and upload an image.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Here you would typically send the data to your backend service
    // For demonstration, we'll just log it to the console
    console.log('Description:', this.description);
    console.log('Selected File:', this.selectedFile);

    // Simulate a successful submission
    this.snackBar.open('Data submitted successfully!', 'Close', {
      duration: 3000,
    });

    // Reset the form
    this.description = '';
    this.selectedFile = null;
  }
}