import { Component, effect, input, model, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../form/form.dialog';
import { CreateAppointment } from '../../types/create-appointment';
import { Appointment } from '../../types/appointment';
import moment from 'moment';
import { TimeSlot } from '../../types/time-slot';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, DatePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  selectedDate = model<Date | null>(null);
  timeSlots?: TimeSlot[];
  createAppointment = output<CreateAppointment>();
  appointments = input<Appointment[]>([]);
  deleteAppointment = output<string>();
  updateAppointment = output<Appointment>();

  constructor(
    private matDialog: MatDialog
  ) {
    effect(() => this.highlightAppointments());
  }

  ngOnInit(): void {
    this.highlightAppointments();
  }

  onTimeSlotSelect(timeSlot: TimeSlot): void {
    const dialogRef = this.matDialog.open(FormDialog, {
      data: {
        selectedDate: this.selectedDate(),
        selectedHour: timeSlot.hour,
        appointment: timeSlot.appointment
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((res: Partial<CreateAppointment> & { delete?: boolean, update?: boolean }) => {
        if (res?.title) {
          this.createAppointment.emit({
            title: res.title,
            description: res.description,
            hour: timeSlot.hour,
            date: this.selectedDate()!
          });
        }
        if (res?.delete && timeSlot.appointment) {
          this.deleteAppointment.emit(timeSlot.appointment.id);
        }
        if (res?.update && res?.title) {
          this.updateAppointment.emit({
            id: timeSlot.appointment!.id,
            title: res.title,
            description: res.description,
            hour: timeSlot.hour,
            date: this.selectedDate()!
          });
        }
      });
  }

  private highlightAppointments(): void {
    if (this.appointments().length > 0) {
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
    } else {
      this.initSlots();
    }
  }

  private initSlots(): void {
    this.timeSlots = Array.from({ length: 24 }, (_, i) => ({ hour: i }));
  }
}
