import { DestroyRef, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export abstract class BaseStore {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly _snackBar = inject(MatSnackBar);

  loading = signal(false);

  iniciarLoading() {
    this.loading.set(true);
  }

  finalizarLoading() {
    this.loading.set(false);
  }
}
