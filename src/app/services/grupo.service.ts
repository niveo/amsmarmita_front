import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Grupo } from '../model/grupo';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private readonly http = inject(HttpClient);

  private readonly _dataSource = new BehaviorSubject<Grupo[]>([]);
  readonly data$ = this._dataSource.asObservable();

  tapRemoverCache = tap(() => {
    this.carregar();
  });

  constructor() {
    this.carregar();
  }

  private carregar() {
    this.http.get<Grupo[]>('/grupos').subscribe((data) => {
      this._dataSource.next(data);
    });
  }

  delete(id: string) {
    return this.http.delete<any>('/grupos/' + id).pipe(this.tapRemoverCache);
  }

  atualizar({
    id,
    nome,
    principal,
    observacao,
  }: {
    id: string;
    nome: string;
    principal: boolean;
    observacao?: string;
  }) {
    return this.http
      .put<any>('/grupos/' + id, {
        nome: nome,
        principal: principal,
        observacao: observacao,
      })
      .pipe(this.tapRemoverCache);
  }

  inlcluir({
    nome,
    principal,
    observacao,
  }: {
    nome: string;
    principal: boolean;
    observacao?: string;
  }) {
    return this.http
      .post<any>('/grupos', {
        nome: nome,
        principal: principal,
        observacao: observacao,
      })
      .pipe(this.tapRemoverCache);
  }
}
