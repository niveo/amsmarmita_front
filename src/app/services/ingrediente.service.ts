import { Injectable } from '@angular/core';
import { Ingrediente } from '../model';
import { finalize } from 'rxjs';
import { BaseService } from './base.service';
import { ExposeServiceRest } from '@navegador/common/expose-service-rest.utils';
import { TipoMedida } from '@navegador/enuns/tipomedida.enum';
import { TipoIngrediente } from '@navegador/enuns/tipoingrediente.enum';

@Injectable({
  providedIn: 'root',
})
@ExposeServiceRest({
  path: '/ingredientes',
})
export class IngredienteService extends BaseService<Ingrediente> {
  getAll() {
    return this.http.get<Ingrediente[]>('/ingredientes');
  }

  delete(id: string) {
    this.iniciarLoading();
    return this.http
      .delete<any>('/ingredientes/' + id)
      .pipe(finalize(() => this.updateData()));
  }

  atualizar(id: string, nome: string, observacao?: string, tipo?: TipoIngrediente | string, 
    embalagemQuantidade?: number, embalagemMedida?: TipoMedida | string,
    quantidade?: number, medida?: TipoMedida | string) {
    this.iniciarLoading();
    return this.http
      .put<any>('/ingredientes/' + id, {
        nome,
        observacao: observacao || null,
        tipo: tipo || null,
        embalagemQuantidade: embalagemQuantidade || null,
        embalagemMedida: embalagemMedida || null,
        quantidade: quantidade || null,
        medida: medida || null
      })
      .pipe(finalize(() => this.updateData()));
  }

  inlcluir(nome: string, observacao?: string, tipo?: TipoIngrediente | string, 
    embalagemQuantidade?: number, embalagemMedida?: TipoMedida | string,
    quantidade?: number, medida?: TipoMedida | string) {
    this.iniciarLoading();
    return this.http
      .post<any>('/ingredientes', {
        nome,
        observacao: observacao || null,
        tipo: tipo || null,
        embalagemQuantidade: embalagemQuantidade || null,
        embalagemMedida: embalagemMedida || null,
        quantidade: quantidade || null,
        medida: medida || null
      })
      .pipe(finalize(() => this.updateData()));
  }
}
