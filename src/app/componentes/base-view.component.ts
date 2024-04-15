import { Component, computed, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacaoDialog } from '@navegador/common/confirmacao-dialog';
import {
  MSG_CONFIRMAR_EXCLUSAO,
  MSG_ERRO_PROCSSAMENTO,
  MSG_EXCLUIR_SUCESSO,
} from '@navegador/common/constantes';
import { BaseService } from '@navegador/services/base.service';

@Component({
  selector: '',
  template: ``,
})
export abstract class BaseViewComponent<T> {
  editarFormData = signal<T>({} as T);
  editarForm = signal(false);

  loading = computed(() => this.service?.loading() || false);

  protected readonly _snackBar = inject(MatSnackBar);
  protected readonly confirmacaoDialog = inject(ConfirmacaoDialog);

  abstract service: BaseService<T>;

  incluir() {
    this.editar();
  }

  editar(item?: T) {
    if (item) {
      const n = JSON.parse(JSON.stringify(item));
      this.editarFormData.set(n);
    } else {
      this.editarFormData.set({} as T);
    }
    this.editarForm.set(true);
  }

  removerRegistro(registroId: string) {
    this.confirmacaoDialog
      .confirmacao({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) this.remover(registroId);
      });
  }

  remover(registroId: string) {
    this.service?.delete(registroId).subscribe({
      error: (error: any) => {
        console.error(error);
        this._snackBar.open(MSG_ERRO_PROCSSAMENTO, 'OK');
      },
      next: () => {
        this._snackBar.open(MSG_EXCLUIR_SUCESSO, 'OK', {
          duration: 3000
        });
      },
    });
  }
}
