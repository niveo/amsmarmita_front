import { DestroyRef, inject, signal } from '@angular/core';
import { NotificationService } from 'amslib';

export abstract class BaseStore {
  protected readonly destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(NotificationService);

  loading = signal(false);

  iniciarLoading() {
    this.loading.set(true);
  }

  finalizarLoading() {
    this.loading.set(false);
  }

  sucessMessage(message: string) {
    this._messageService.success(message);
  }

  errorMessage(titulo: string, mensagem: any) {
    this._messageService.error(titulo, JSON.parse(mensagem));
  }
}
