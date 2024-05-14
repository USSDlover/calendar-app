import { Injectable, signal } from '@angular/core';
import { Appointment } from '../types/appointment';
import { CreateAppointment } from '../types/create-appointment';

@Injectable()
export class AppointmentService {
  selectedDate = signal<Date | null>(new Date());
  appointments = signal<Appointment[]>([]);

  constructor() { }

  create(appointment: CreateAppointment) {
    this.appointments.update(state => (state.concat({
      id: new Date().getTime().toString(),
      ...appointment
    })));
  }

  delete(id: string): void {
    this.appointments.update(state => (state.filter(ap => ap.id !== id)));
  }

  update(appointment: Appointment): void {
    this.appointments.update(state => (state.map(ap => {
      if (ap.id === appointment.id) {
        return appointment;
      } else {
        return ap;
      }
    })));
  }
}
