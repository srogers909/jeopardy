import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  styleUrls: ['./app.component.scss'],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Jeopardy - Angular Version';
}
