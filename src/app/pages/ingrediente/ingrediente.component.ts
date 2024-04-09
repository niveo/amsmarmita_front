import { Component, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ERRO_PROCSSAMENTO,
  MSG_CONFIRMAR_EXCLUSAO,
} from '../../common/constantes';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacaoDialog } from '../../common/confirmacao-dialog';

@Component({
  selector: 'app-ingrediente-component',
  templateUrl: './ingrediente.component.html',
  styles: [
    `
      :host {
        height: 100%;
        background-color: white;
      }
    `,
  ],
})
export class IngredienteComponent {
  private readonly service = inject(IngredienteService);
  private readonly _snackBar = inject(MatSnackBar);
  protected readonly confirmacaoDialog = inject(ConfirmacaoDialog);

  editarFormData = signal<any>(null);
  editarForm = false;

  data$: Observable<Ingrediente[]> = this.service.data$;

  loading = computed(() => this.service.loading());

  incluir() {
    this.editar();
  }

  editar(item?: Ingrediente) {
    this.editarFormData.set({ ...item });
    this.editarForm = true;
  }

  remover(item: Ingrediente) {
    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this._snackBar.open(MSG_ERRO_PROCSSAMENTO);
      },
      next: () => {
        this._snackBar.open(MSG_EXCLUIR_SUCESSO);
      },
    });
  }

  removerRegistro(item: Ingrediente) {
    this.confirmacaoDialog
      .confirmacao({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) this.remover(item);
      });
  }
}
