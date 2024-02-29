import { Component } from '@angular/core';
import { isMobile } from './common/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobile = isMobile;
  constructor() {}
}
