import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/tasks/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.eventForm = this.fb.group({
      tittle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const userId = this.getUserIdFromToken();
      console.log('User ID from token:', userId); // Kullanıcı ID'sini konsola yazdırma
      const event = { userId, ...this.eventForm.value };

      this.taskService.addTask(event).subscribe(
        response => {
          console.log('Task added successfully', response);
          this.router.navigate(['/redirect']);
        },
        error => {
          console.error('Error adding task', error);
        }
      );
    }
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload); // Payload'u konsola yazdırma
      return payload.UserId; // UserId alanını kullanarak kullanıcı ID'sini al
    }
    return 0; // Hata durumunda uygun bir değer döndürün.
  }
}
