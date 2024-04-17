import { Component, input, output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'central-container',
  templateUrl: './central-container.component.html',
  standalone: true,
  imports: [MatSidenavModule, MatProgressBarModule],
})
export class CentralContainerComponent {
  loading = input(false);
  drawer = input(false);
  drawerChange = output<boolean>();
}
