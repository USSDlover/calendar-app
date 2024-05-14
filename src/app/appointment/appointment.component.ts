import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentService } from './services/appointment.service';
import { CreateAppointment } from './types/create-appointment';

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

  onCreateAppointment(appointment: CreateAppointment) {
    this.service.create(appointment);
  }

  onDeleteAppointment(id: string) {
    this.service.delete(id);
  }
}
