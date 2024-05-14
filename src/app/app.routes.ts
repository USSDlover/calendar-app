import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'appointment',
    loadComponent: () =>
      import('./appointment/appointment.component')
        .then(c => c.AppointmentComponent)
  }
];
