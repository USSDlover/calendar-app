import { Component, effect, input, model, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../form/form.dialog';
import { CreateAppointment } from '../../types/create-appointment';
import { Appointment } from '../../types/appointment';
import moment from 'moment';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, DatePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  selectedDate = model<Date | null>(null);
  timeSlots?: {
    hour: number;
    appointment?: Appointment;
  }[];
  createAppointment = output<CreateAppointment>();
  appointments = input<Appointment[]>([]);

  constructor(
    private matDialog: MatDialog
  ) {
    this.timeSlots = Array.from({ length: 24 }, (_, i) => ({ hour: i }));
    effect(() => this.highlightAppointments());
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

  highlightAppointments(): void {
    this.appointments().forEach((appointment: Appointment) => {
      const appointmentDate = moment(appointment.date);
      const selectedDate = moment(this.selectedDate());
      if (appointment.date) {
        if (this.timeSlots) {
          this.timeSlots.forEach((slot) => {
            if (slot.hour === appointment.hour && appointmentDate.isSame(selectedDate)) {
              slot.appointment = appointment;
            } else {
              slot.appointment = undefined;
            }
          });
        }
      }
    });
  }
}
