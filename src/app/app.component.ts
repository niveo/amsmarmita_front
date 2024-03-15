import { Component, inject } from '@angular/core';
import { isMobile } from './common/util';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { EventType, Router } from '@angular/router';
import { TOKEN_APP_CONFIG } from './common/tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobile = isMobile;
  visible = false;
  isCollapsed = false;
  placement: NzDrawerPlacement = 'right';
  readonly config = inject(TOKEN_APP_CONFIG);
  private readonly route = inject(Router);
  constructor() {
    if (isMobile) {
      this.placement = 'right';
    }
    this.route.events.subscribe((event) => {
      //console.log(event);
      if (
        [
          EventType.ActivationEnd,
          EventType.NavigationSkipped,
          EventType.NavigationEnd,
        ].includes(event.type)
      ) {
        this.visible = false;
      }
    });
  }
  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  openView(view: string) {
    this.route.navigate([view]);
  }
}
