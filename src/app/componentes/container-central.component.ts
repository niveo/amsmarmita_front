import { Component, input, output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'container-central',
  templateUrl: './container-central.component.html',
  standalone: true,
  imports: [MatSidenavModule, MatProgressBarModule],
})
export class ContainerCentralComponent {
  loading = input(false);
  drawer = input(false);
  drawerChange = output<boolean>();
}
