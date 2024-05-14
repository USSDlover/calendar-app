import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <app-navigation />
    <div class="content">
      <router-outlet />
    </div>
  `,
  styles: `
    .content {
      padding-top: 1.5rem;
    }
  `
})
export class AppComponent {}
