import { Component, effect, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Ingrediente } from '@navegador/model';

//View para cadastro de novo ingrediente atravez de um dialog, view chamada do selecao-ingredientes.component
@Component({
  selector: 'app-ingrediente-form-dialog-component',
  template: ` <h5 mat-dialog-title></h5>
    <mat-dialog-content>
      <app-ingrediente-form-component [(visible)]="editarForm" [data]="data" />
    </mat-dialog-content>`,
})
export class IngredienteFormDialogComponent {
  data: Ingrediente = new Ingrediente();
  editarForm = signal(true);
  private readonly ref = inject(MatDialogRef);
  constructor() {
    this.ref.updateSize('300px', '350px');
    effect(() => {
      if (!this.editarForm()) {
        this.ref.close();
      }
    });
  }
}
