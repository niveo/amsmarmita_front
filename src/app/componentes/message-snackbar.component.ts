import { Component, Inject, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {
  AmsDialogModule,
  AmsDialogService,
} from '@navegador/common/confirmacao-dialog';

interface MessageData {
  titulo: string;
  mensagem?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageSnackBarService {
  protected readonly _snackBar = inject(MatSnackBar);

  create(data: MessageData) {
    this._snackBar.openFromComponent(MessageSnackBarComponent, {
      data: data,
      duration: 3000
    });
  }
}

@Component({
  selector: 'app-message-snackbar-component',
  template: `<div class="content">
    <span matSnackBarLabel>{{ data.titulo }}</span>
    <div matSnackBarActions class="content-buttons">
      @if (data.mensagem) {
        <button mat-button matSnackBarAction (click)="detalhar()">
          <mat-icon>warning</mat-icon>
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
    AmsDialogModule,
  ],
})
export class MessageSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data = inject<MessageData>(MAT_SNACK_BAR_DATA);

  dialogService = inject(AmsDialogService);

  detalhar() {
    this.snackBarRef.dismissWithAction();
    this.dialogService.openAlerta({
      mensagem: this.data.mensagem!,
      titulo: this.data.titulo,
    });
  }
}
