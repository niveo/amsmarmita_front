import { DestroyRef, inject, signal } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';

export abstract class BaseStore {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly notify = inject(NzNotificationService);

  loading = signal(false);

  iniciarLoading() {
    this.loading.set(true);
  }

  finalizarLoading() {
    this.loading.set(false);
  }
}
