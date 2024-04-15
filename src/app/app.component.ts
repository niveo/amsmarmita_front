import {
  Component,
  OnDestroy,
  Signal,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { isMobile } from './common/util';
import { EventType, Router } from '@angular/router';
import { TOKEN_APP_CONFIG } from './common/tokens';
import { AuthService } from './auth/auth.service';
import { SessionTimerService } from './services/session-timer.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isMobile = isMobile;

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  readonly config = inject(TOKEN_APP_CONFIG);
  private readonly route = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly sessionTimerService = inject(SessionTimerService);

  usuarioLogado: Signal<boolean> = computed(() =>
    this._authService.isAuthenticatedUser(),
  );

  listaMenu = [
    {
      rota: '',
      titulo: 'Marmitas',
      icone: 'soup_kitchen',
    },
    {
      rota: 'comedores',
      titulo: 'Comedores',
      icone: 'groups',
    },
    {
      rota: 'grupos',
      titulo: 'Grupo/Pratos',
      icone: 'bento',
    },
    {
      rota: 'pratos',
      titulo: 'Pratos',
      icone: 'restaurant_menu',
    },
    {
      rota: 'ingredientes',
      titulo: 'Ingredientes',
      icone: 'kitchen',
    },
  ];

  constructor() {  
    this.sessionTimerService.sessionFinished$.subscribe(() => {});

    this.route.events.subscribe((event) => {
      //console.log(event);
      if (
        [
          EventType.ActivationEnd,
          EventType.NavigationSkipped,
          EventType.NavigationEnd,
        ].includes(event.type)
      ) {
        this.drawer.close();
      }
    });
  }

  openView(view: string) {
    this.route.navigate([view]);
  }

  ngOnDestroy(): void {
    this.sessionTimerService.stopTimer();
  }
}
