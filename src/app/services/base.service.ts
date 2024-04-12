import { HttpClient } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseService {
  protected readonly http = inject(HttpClient);
  loading = signal(true);
  abstract delete(id: string): any;
  abstract data$: Observable<any>;
}
