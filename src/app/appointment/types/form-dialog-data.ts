import { Appointment } from './appointment';

export interface FormDialogData {
  selectedDate: Date;
  selectedHour: number;
  appointment?: Appointment;
}
