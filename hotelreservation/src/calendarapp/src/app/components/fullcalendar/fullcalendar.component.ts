import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventService } from '../../services/event/event.service';
import { TaskService } from '../../services/tasks/task.service';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.scss'
})
export class FullCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  events: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    views: {
      dayGridMonth: { buttonText: 'Aylık' },
      timeGridWeek: { buttonText: 'Haftalık' },
      timeGridDay: { buttonText: 'Günlük' }
    },
    dateClick: this.handleDateClick.bind(this),
    events: this.events
  };

  constructor(private eventService: EventService, private taskService: TaskService) { }

  ngOnInit() {
    this.loadEvents();
    this.loadTasks();
  }

  loadEvents() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.UserId; // UserId alanını kullanarak kullanıcı ID'sini al

      this.eventService.getEvents(userId).subscribe(
        (events: any) => {
          const formattedEvents = events.map((event: any) => ({
            title: event.tittle,
            start: event.startDate,
            end: event.endDate
          }));
          this.events = [...this.events, ...formattedEvents];
          this.calendarOptions.events = this.events;
        },
        error => {
          console.error('Error loading events', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

  loadTasks() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.UserId; // UserId alanını kullanarak kullanıcı ID'sini al

      this.taskService.getTask(userId).subscribe(
        (tasks: any) => {
          const formattedTasks = tasks.map((task: any) => ({
            title: task.tittle,
            start: task.startDate,
            end: task.endDate,
            backgroundColor: 'red', // Task'ları kırmızı renkte göster
            borderColor: 'red'
          }));
          this.events = [...this.events, ...formattedTasks];
          this.calendarOptions.events = this.events;
        },
        error => {
          console.error('Error loading tasks', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}