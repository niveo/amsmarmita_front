import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NotificationMessageData } from './notitication-message.data';
import { NotificationDialogService } from './notication-dialog.service';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIconModule,
    MatDialogModule,
  ],
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);
  data = inject<NotificationMessageData>(MAT_SNACK_BAR_DATA);

  private readonly _notificationDialogService = inject(
    NotificationDialogService,
  );

  detalhar() {
    this.snackBarRef.dismissWithAction();

    this._notificationDialogService.open({
      titulo: this.data.titulo,
      mensagem: this.data.message,
    });
  }
}
