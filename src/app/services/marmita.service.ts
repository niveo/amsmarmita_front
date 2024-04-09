import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Marmita } from '../model/marmita';
import { BehaviorSubject, finalize, mergeMap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarmitaService {
  private readonly http = inject(HttpClient);
  private _resourceData$ = new BehaviorSubject<void>(undefined);
  loading = signal(true);

  private apiRequest$ = this.http
    .get<Marmita[]>('/marmitas')
    .pipe(finalize(() => this.loading.set(false)));

  public data$ = this._resourceData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1),
  );

  updateData() {
    this._resourceData$.next();
  }

  getAll() {
    return this.http.get<Marmita[]>('/marmitas');
  }

  delete(id: string) {
    return this.http
      .delete<any>('/marmitas/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, lancamento: Date, observacao?: string | null) {
    return this.http
      .put<any>('/marmitas/' + id, {
        lancamento: lancamento,
        observacao: observacao,
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(lancamento: Date, observacao?: string | null) {
    return this.http
      .post<any>('/marmitas', {
        lancamento: lancamento,
        observacao: observacao,
      })
      .pipe(finalize(() => this.updateData()));
  }
}
