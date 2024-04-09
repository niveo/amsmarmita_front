import { Component, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar-component',
  template: `@if (visible()) {
    <mat-progress-bar
      mode="indeterminate"
      style="height: 4px"
    ></mat-progress-bar>
  } `,
  standalone: true,
  imports: [MatProgressBarModule],
})
export class ProgressBarComponent {
  visible = input(false);
}
