import { Injectable, signal } from '@angular/core';

@Injectable()
export class AppointmentService {
  selectedDate = signal<Date | null>(new Date());

  constructor() { }
}
