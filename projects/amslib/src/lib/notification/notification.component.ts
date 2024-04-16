import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NotificationMessageData } from './notitication-message.data';

@Component({
  selector: 'app-notification-component',
  template: `<div class="content">
    <span matSnackBarLabel>{{ data.titulo }}</span>
    <div matSnackBarActions class="content-buttons">
      @if (data.tipo && data.message) {
        <button mat-button matSnackBarAction (click)="detalhar()">
          @switch (data.tipo) {
            @case ('warning') {
              <mat-icon>warning</mat-icon>
            }
            @case ('info') {
              <mat-icon>info</mat-icon>
            }
            @case ('error') {
              <mat-icon>error</mat-icon>
            }
            @case ('success') {
              <mat-icon>sentiment_satisfied</mat-icon>
            }
            @default {
              <mat-icon>info</mat-icon>
            }
          }
        </button>
      }
      <button
        mat-button
        matSnackBarAction
        (click)="snackBarRef.dismissWithAction()"
      >
        OK
      </button>
    </div>
  </div>`,
  styles: [
    `
      .content {
        display: flex;
        flex-direction: column;
        padding: 5px;
      }
      .content-buttons {
        justify-content: end;
      }
    `,
  ],
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

  private readonly dialog = inject(MatDialog);

  detalhar() {
    this.snackBarRef.dismissWithAction();

    this.dialog.open<any>(NotificationtDialog, {
      data: { titulo: this.data.titulo, mensagem: this.data.message },
      height: '400px',
    });
  }
}

@Component({
  selector: 'app-notification-dialog',
  template: ` @if (data.titulo) {
      <h2 mat-dialog-title>{{ data.titulo }}</h2>
    }

    <mat-dialog-content class="mat-typography" style="line-break: auto;">
      @if (data.mensagem) {
        {{ data.mensagem }}
      }
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>
        OK
      </button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
class NotificationtDialog {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
