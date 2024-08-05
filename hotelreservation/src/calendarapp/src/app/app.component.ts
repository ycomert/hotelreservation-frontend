import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarComponent } from './components/fullcalendar/fullcalendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
