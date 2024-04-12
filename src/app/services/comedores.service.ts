import { Injectable } from '@angular/core';
import { Comedor } from '../model/comedor';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ComedoresService extends BaseService<Comedor> {
  apiRequest$ = this.http
    .get<Comedor[]>('/comedores')
    .pipe(finalize(() => this.loading.set(false)));

  getId(id: string) {
    return this.http.get<Comedor[]>('/comedores/' + id);
  }

  delete(id: string) {
    return this.http
      .delete<any>('/comedores/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string) {
    return this.http
      .put<any>('/comedores/' + id, { nome: nome })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string) {
    return this.http
      .post<any>('/comedores', { nome: nome })
      .pipe(finalize(() => this.updateData()));
  }
}
