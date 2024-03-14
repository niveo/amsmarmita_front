import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comedor } from '../model/comedor';

@Injectable()
export class ComedoresService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Comedor[]>('/comedores');
  }

  getId(id: string) {
    return this.http.get<Comedor[]>('/comedores/' + id);
  }

  delete(id: string) {
    return this.http.delete<any>('/comedores/' + id);
  }

  atualizar(id: string, nome: string) {
    return this.http.put<any>('/comedores/' + id, { nome: nome });
  }

  inlcluir(nome: string) {
    return this.http.post<any>('/comedores', { nome: nome });
  }
}
