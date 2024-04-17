import { Component, input, output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'central-container',
  templateUrl: './central-container.component.html',
  standalone: true,
  imports: [MatSidenavModule, MatProgressBarModule, MatButtonModule, MatIconModule],
})
export class CentralContainerComponent {
  loading = input(false);
  drawer = input(false);
  drawerChange = output<boolean>();

  incluir = output<void>();

  hideHeader = input(false);
}
