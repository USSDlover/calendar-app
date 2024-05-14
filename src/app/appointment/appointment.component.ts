import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentService } from './services/appointment.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  imports: [ CalendarComponent ],
  styleUrl: './appointment.component.scss',
  providers: [AppointmentService]
})
export class AppointmentComponent {

  constructor(
    public service: AppointmentService
  ) {}

  onDateSelected(date: Date | null) {
    if (date) {
      this.service.selectedDate.set(date);
    }
  }
}
