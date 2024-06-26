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
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { FormDialogFlags } from '../../types/form-dialog-flags';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, DatePipe, CdkDropList, CdkDrag],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  selectedDate = model<Date | null>(null);
  appointments = input<Appointment[]>([]);

  createAppointment = output<CreateAppointment>();
  deleteAppointment = output<string>();
  updateAppointment = output<Appointment>();

  timeSlots?: TimeSlot[];

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
        this.onAppointmentDialogResult(timeSlot, res);
      });
  }

  onAppointmentDropped(event: CdkDragDrop<Appointment>) {
    if (event.previousIndex !== event.currentIndex && this.timeSlots && this.timeSlots[event.previousIndex].appointment) {
      // Can not put into slot with appointment
      if (this.timeSlots[event.currentIndex].appointment) return;

      this.timeSlots[event.currentIndex].appointment = this.timeSlots[event.previousIndex].appointment;
      this.timeSlots[event.previousIndex].appointment = undefined;

      const newTimeSlot = this.timeSlots[event.currentIndex];
      this.updateAppointment.emit({
        id: newTimeSlot.appointment!.id,
        title: newTimeSlot.appointment!.title,
        description: newTimeSlot.appointment!.description,
        hour: newTimeSlot.hour,
        date: newTimeSlot.appointment!.date
      });
    }
  }

  private onAppointmentDialogResult(timeSlot: TimeSlot, res: Partial<CreateAppointment> & FormDialogFlags): void {
    if (res?.update && res?.title) {
      this.updateAppointment.emit({
        id: timeSlot.appointment!.id,
        title: res.title,
        description: res.description,
        hour: timeSlot.hour,
        date: this.selectedDate()!
      });
    }
    else if (res?.delete && timeSlot.appointment) {
      this.deleteAppointment.emit(timeSlot.appointment.id);
    }
    else if (res?.title) {
      this.createAppointment.emit({
        title: res.title,
        description: res.description,
        hour: timeSlot.hour,
        date: this.selectedDate()!
      });
    }
  }

  private highlightAppointments(): void {
    if (this.appointments().length > 0) {
      this.appointments().forEach((appointment: Appointment) => {
        const appointmentDate = moment(appointment.date);
        const selectedDate = moment(this.selectedDate());
        if (appointment.date) {
          if (this.timeSlots) {
            this.timeSlots.forEach((slot) => {
              if (appointmentDate.isSame(selectedDate)) {
                if (slot.hour === appointment.hour) {
                  slot.appointment = appointment;
                }
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
