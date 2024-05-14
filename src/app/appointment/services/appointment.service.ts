import { Injectable, signal } from '@angular/core';
import { Appointment } from '../types/appointment';
import { CreateAppointment } from '../types/create-appointment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppointmentService {
  _selectedDate = new BehaviorSubject<Date>(new Date());
  appointments = signal<Appointment[]>([]);

  constructor() { }

  selectedDate(): Observable<Date> {
    return this._selectedDate.asObservable();
  }

  setSelectedDate(newDate: Date): void {
    this._selectedDate.next(newDate);
  }

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
