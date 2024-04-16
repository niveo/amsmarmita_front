import { Injectable } from '@angular/core';
import { Comedor } from '../model/comedor';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/comedores',
})
export class ComedoresService extends BaseService<Comedor> {
  getId(id: string) {
    return this.http.get<Comedor[]>('/comedores/' + id);
  }

  delete(id: string) {
    this.iniciarLoading();
    return this.http
      .delete<any>('/comedores/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string) {
    this.iniciarLoading();
    return this.http
      .put<any>('/comedores/' + id, { nome: nome })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string) {
    this.iniciarLoading();
    return this.http
      .post<any>('/comedores', { nome: nome })
      .pipe(finalize(() => this.updateData()));
  }
}
