import { Component, Inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NotificationMessageDialogData } from './notitication-message.data';

@Component({
  selector: 'app-notification-dialog-component',
  templateUrl: './notification-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class NotificationtDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<
      NotificationtDialogComponent,
      NotificationMessageDialogData
    >,
    @Inject(MAT_DIALOG_DATA)
    public data: NotificationMessageDialogData,
  ) {}
}
