import { Component, Signal, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  LBL_EXCLUSAO,
  LBL_ERRO,
} from '../../common/constantes';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IngredienteFormComponent } from './ingrediente-form.component';

@Component({
  selector: 'app-ingrediente-component',
  templateUrl: './ingrediente.component.html',
  styles: [
    `
      :host {
        height: 100%;
        background-color: white;
      }
    `,
  ],
})
export class IngredienteComponent {
  private readonly service = inject(IngredienteService);
  private readonly notify = inject(NzNotificationService);

  private readonly modal = inject(NzModalService);

  data$!: Observable<any[]>;
  loading = signal<boolean>(false);

  constructor() {
    this.data$ = this.service.data$.pipe(
      catchError((error: any) => {
        this.notify.error('Erro', error.message);
        return EMPTY;
      }),
    );
  }

  incluir() {
    this.editar();
  }

  editar(item?: Ingrediente) {
    this.modal.create({
      nzContent: IngredienteFormComponent,
      nzData: { ...item },
      nzKeyboard: false,
      nzMask: false,
      nzTitle: 'Ingrediente',
      nzFooter: null,
    });
  }

  remover(item: Ingrediente) {
    this.service.delete(item._id!).subscribe({
      error: (error) => {
        console.error(error);
        this.notify.error(LBL_ERRO, error.message);
      },
      next: () => {
        this.notify.success(LBL_EXCLUSAO, MSG_EXCLUIR_SUCESSO);
      },
    });
  }
}
