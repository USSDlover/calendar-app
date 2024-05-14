import { Component } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
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
    <mat-toolbar color="primary" class="mat-elevation-z3">
      <mat-toolbar-row>
        <h3>Calendar App</h3>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: ``
})
export class NavigationComponent {

}
