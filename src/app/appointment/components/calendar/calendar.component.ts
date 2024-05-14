import { Component, effect, input, model, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../form/form.dialog';
import { CreateAppointment } from '../../types/create-appointment';
import { Appointment } from '../../types/appointment';

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
  createAppointment = output<CreateAppointment>();
  appointments = input<Appointment[]>([]);

  constructor(
    private matDialog: MatDialog
  ) {
    this.hours = Array.from({ length: 24 }, (_, i) => i);
  }

  onTimeSlotSelect(hour: number): void {
    const dialogRef = this.matDialog.open(FormDialog, {
      data: {
        selectedDate: this.selectedDate(),
        selectedHour: hour
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((res: Partial<CreateAppointment>) => {
        if (res?.title) {
          this.createAppointment.emit({
            title: res.title,
            description: res.description,
            hour,
            date: this.selectedDate()!
          });
        }
      });
  }
}
