import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationtDialogComponent } from './notification-dialog.component';
import { NotificationMessageDialogData } from './notitication-message.data';

@Injectable({
  providedIn: 'root',
})
export class NotificationDialogService {
  private readonly dialog = inject(MatDialog);

  open({ titulo, mensagem }: { titulo?: string; mensagem: string }) {
    const component = this.dialog.open<
      NotificationtDialogComponent,
      NotificationMessageDialogData
    >(NotificationtDialogComponent, {
      data: { titulo: titulo, mensagem: mensagem },
      minWidth: '300px',
    });
    return component;
  }

  confirmation({ titulo, mensagem }: { titulo?: string; mensagem: string }) {
    const component = this.dialog.open<
      NotificationtDialogComponent,
      NotificationMessageDialogData
    >(NotificationtDialogComponent, {
      data: {
        titulo: titulo,
        mensagem: mensagem,
        showNoButton: true,
        noButtonTitle: 'Não',
        okButtonTitle: 'Sim',
      },
      minWidth: '300px',
    });
    return component;
  }
}
