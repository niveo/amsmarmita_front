import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  LBL_EXCLUSAO,
  LBL_ERRO,
} from '../../common/constantes';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../model';

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

  editarFormData = signal<any>(null);
  editarForm = false;

  data$!: Observable<any[]>;
  loading = signal<boolean>(false);

  constructor() {
    this.data$ = this.service.data$;
  }

  incluir() {
    this.editar();
  }

  editar(item?: Ingrediente) {
    this.editarFormData.set({ ...item });
    this.editarForm = true;
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
