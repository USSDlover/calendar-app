import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  imports: [ CalendarComponent ],
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {}
