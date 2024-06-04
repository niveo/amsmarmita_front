import { Component, computed, inject, output, signal } from '@angular/core';
import {
  MSG_CONFIRMAR_EXCLUSAO,
  MSG_ERRO_PROCSSAMENTO,
  MSG_EXCLUIR_SUCESSO,
} from '@navegador/common/constantes';
import { NotificationDialogService, NotificationService } from 'amslib';
import { BaseService } from '@navegador/services/base.service';

@Component({
  selector: '',
  template: ``,
})
export abstract class BaseContainerComponent<T> {
  editarFormData = signal<T>({} as T);
  editarForm = signal(false);
  loading = computed(() => this.service?.loading() || false);

  registroRemovidoSuccess = output<String>();

  protected readonly _messageService = inject(NotificationService);
  protected readonly _notificationDialogService = inject(
    NotificationDialogService,
  );

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
    this._notificationDialogService
      .confirmation({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) this.remover(registroId);
      });
  }

  remover(registroId: string) {
    this.service?.delete(registroId).subscribe({
      error: (error: any) => {
        console.error(error);
        this._messageService.error(MSG_ERRO_PROCSSAMENTO, error);
      },
      next: () => {
        this.registroRemovidoSuccess.emit(registroId);
        this._messageService.info(MSG_EXCLUIR_SUCESSO);
      },
    });
  }
}
