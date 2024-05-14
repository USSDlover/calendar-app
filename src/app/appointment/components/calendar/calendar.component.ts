import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, DatePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  selectedDate = model<Date | null>(new Date());
  hours?: number[];

  constructor(
    private matDialog: MatDialog
  ) {
    this.hours = Array.from({ length: 24 }, (_, i) => i);
  }

  onTimeSlotSelect(hour: number): void {
    this.matDialog.open(FormComponent);
  }
}
