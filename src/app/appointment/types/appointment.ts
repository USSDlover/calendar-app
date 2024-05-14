export interface Appointment {
  id: string;
  title: string;
  date: Date;
  hour: number; // 23h [0, 23]
  description?: string;
}
