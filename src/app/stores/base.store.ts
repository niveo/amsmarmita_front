import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, signal } from '@angular/core';
import { parseErroResponse } from '@navegador/common/util';
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

  errorMessage(titulo: string, error: any) {
    this._messageService.error(titulo, parseErroResponse(error));
  }
}
