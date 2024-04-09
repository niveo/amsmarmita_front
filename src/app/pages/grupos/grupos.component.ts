import { Component, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_CONFIRMAR_EXCLUSAO,
  MSG_ERRO_PROCSSAMENTO,
} from '../../common/constantes';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../model/grupo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacaoDialog } from '../../common/confirmacao-dialog';

@Component({
  selector: 'app-grupos-component',
  templateUrl: './grupos.component.html',
  styles: [
    `
      :host {
        background-color: white;
        height: 100%;
      }
    `,
  ],
})
export class GrupoComponent {
  private readonly service = inject(GrupoService);
  private readonly _snackBar = inject(MatSnackBar);
  protected readonly confirmacaoDialog = inject(ConfirmacaoDialog);

  data$: Observable<any[]> = this.service.data$;

  loading = computed(() => this.service.loading());

  editarFormData = signal<any>(null);
  editarForm = false;

  incluir() {
    this.editar();
  }

  editar(item?: Grupo) {
    this.editarFormData.set({ ...item });
    this.editarForm = true;
  }

  remover(item: Grupo) {
    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this._snackBar.open(MSG_ERRO_PROCSSAMENTO, 'OK');
      },
      next: () => {
        this._snackBar.open(MSG_EXCLUIR_SUCESSO, 'OK');
      },
    });
  }

  removerRegistro(item: Grupo) {
    this.confirmacaoDialog
      .confirmacao({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) this.remover(item);
      });
  }
}
