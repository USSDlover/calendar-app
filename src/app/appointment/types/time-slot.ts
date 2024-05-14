import { Appointment } from './appointment';

export interface TimeSlot {
  hour: number;
  appointment?: Appointment;
}
