import {
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { isMobile } from './common/util';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { EventType, Router } from '@angular/router';
import { TOKEN_APP_CONFIG } from './common/tokens';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { SessionTimerService } from './services/session-timer.service';
import {
  NzNotificationComponent,
  NzNotificationService,
} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isMobile = isMobile;
  visible = false;
  isCollapsed = false;
  placement: NzDrawerPlacement = 'right';
  usuarioLogado$!: Observable<boolean>;

  readonly config = inject(TOKEN_APP_CONFIG);
  private readonly route = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly sessionTimerService = inject(SessionTimerService);
  private readonly notification = inject(NzNotificationService);

  @ViewChild('notificationBtnTpl', { static: true }) btnTemplate!: TemplateRef<{
    $implicit: NzNotificationComponent;
  }>;

  constructor() {
    this.usuarioLogado$ = this._authService.usuarioLogado$;

    this.sessionTimerService.sessionFinished$.subscribe(() => {
      this.notification
        .blank('Sessão', 'Sua sessão foi finalizada...', {
          nzDuration: 0,
          nzPlacement: 'bottom',
          nzButton: this.btnTemplate,
        })
        .onClose.subscribe(() => {
          this._authService.logout();
        });
    });

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

  ngOnDestroy(): void {
    this.sessionTimerService.stopTimer();
  }
}
