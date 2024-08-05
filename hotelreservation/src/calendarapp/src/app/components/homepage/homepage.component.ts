import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FullCalendarComponent } from '../fullcalendar/fullcalendar.component';
import { EventComponent } from "../event/event.component";
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [LayoutComponent, FullCalendarComponent, EventComponent, TaskComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
