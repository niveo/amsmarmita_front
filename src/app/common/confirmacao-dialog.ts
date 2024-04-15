import { Component, Inject, Injectable, NgModule, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Injectable()
export class AmsDialogService {
  private readonly dialog = inject(MatDialog);

  confirmacao({ titulo, mensagem }: { titulo?: string; mensagem: string }) {
    return this.dialog.open<any>(ConfirmacaoComponentDialog, {
      data: { titulo: titulo, mensagem: mensagem },
    });
  }

  openAlerta({ titulo, mensagem }: { titulo?: string; mensagem: string }) {
    return this.dialog.open<any>(AlertaComponentDialog, {
      data: { titulo: titulo, mensagem: mensagem },
      minWidth: '300px',
    });
  }
}

@Component({
  selector: 'app-confirmacao-component-dialog',
  template: ` @if (data.titulo) {
      <h2 mat-dialog-title>{{ data.titulo }}</h2>
    }
    <mat-dialog-content>
      {{ data.mensagem }}
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Não</button>
      <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>
        Sim
      </button>
    </mat-dialog-actions>`,
})
export class ConfirmacaoComponentDialog {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}

@Component({
  selector: 'app-alerta-component-dialog',
  template: ` @if (data.titulo) {
      <h2 mat-dialog-title>{{ data.titulo }}</h2>
    }
    <mat-dialog-content>
      {{ data.mensagem }}
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>
        OK
      </button>
    </mat-dialog-actions>`,
})
export class AlertaComponentDialog {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}

@NgModule({
  imports: [MatDialogModule, MatButtonModule],
  declarations: [ConfirmacaoComponentDialog, AlertaComponentDialog],
  providers: [AmsDialogService],
})
export class AmsDialogModule {}
