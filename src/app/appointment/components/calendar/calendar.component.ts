import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, DatePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  selectedDate?: Date;
  hours?: number[];

  constructor() {
    this.selectedDate = new Date();
    this.hours = Array.from({ length: 24 }, (_, i) => i);
  }
}
