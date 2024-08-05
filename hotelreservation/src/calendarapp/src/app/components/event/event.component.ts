import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) {
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

      this.eventService.addEvent(event).subscribe(
        response => {
          console.log('Event added successfully', response);
          this.router.navigate(['/redirect']);
        },
        error => {
          console.error('Error adding event', error);
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