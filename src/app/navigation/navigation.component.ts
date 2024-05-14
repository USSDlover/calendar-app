import { Component } from '@angular/core';
import { MatToolbar, MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    RouterLink
  ],
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <h3>Calendar App</h3>
        <button routerLink="appointment">Appointment</button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: ``
})
export class NavigationComponent {

}
