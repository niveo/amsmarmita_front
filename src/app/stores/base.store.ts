import { DestroyRef, inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';

export abstract class BaseStore {
  private readonly _loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loadingSource.asObservable();
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly notify = inject(NzNotificationService);

  iniciarLoading() {
    this._loadingSource.next(true);
  }

  finalizarLoading() {
    this._loadingSource.next(false);
  }
}
