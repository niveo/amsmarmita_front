import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';
import { NotificationMessageData } from './notitication-message.data';

const DURATION_MESSAGE = 500;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  protected readonly _snackBar = inject(MatSnackBar);

  default(titulo: string) {
    this._snackBar.openFromComponent<NotificationComponent, NotificationMessageData>(
      NotificationComponent,
      {
        data: {
          titulo,
        },
        duration: DURATION_MESSAGE,
      },
    );
  }

  info(titulo: string) {
    this._snackBar.openFromComponent<NotificationComponent, NotificationMessageData>(
      NotificationComponent,
      {
        data: {
          titulo,
          tipo: 'info',
        },
        duration: DURATION_MESSAGE,
      },
    );
  }

  error(titulo: string, message: string) {
    this._snackBar.openFromComponent<NotificationComponent, NotificationMessageData>(
      NotificationComponent,
      {
        data: {
          titulo,
          message,
          tipo: 'error',
        },
      },
    );
  }

  warning(titulo: string, message?: string) {
    this._snackBar.openFromComponent<NotificationComponent, NotificationMessageData>(
      NotificationComponent,
      {
        data: {
          titulo,
          message,
          tipo: 'error',
        },
      },
    );
  }

  success(titulo: string) {
    this._snackBar.openFromComponent<NotificationComponent, NotificationMessageData>(
      NotificationComponent,
      {
        data: {
          titulo,
          tipo: 'success',
        },
        duration: DURATION_MESSAGE,
      },
    );
  }
}
