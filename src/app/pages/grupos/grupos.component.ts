import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  LBL_EXCLUSAO,
  LBL_ERRO,
} from '../../common/constantes';
import { GrupoService } from '../../services/grupo.service';
import { Grupo } from '../../model/grupo';

@Component({
  selector: 'app-grupos-component',
  templateUrl: './grupos.component.html',
  styles: [
    `
      :host {
        height: 100%;
        background-color: white;
      }
    `,
  ],
})
export class GrupoComponent {
  private readonly service = inject(GrupoService);
  private readonly notify = inject(NzNotificationService);

  data$: Observable<any[]> = this.service.data$;

  loading = signal(false);

  editarFormData = signal<any>(null);
  editarForm = false;

  incluir() {
    this.editar();
  }

  editar(item?: Grupo) {
    this.editarFormData.set({ ...item });
    this.editarForm = true;
  }

  remover(item: Grupo) {
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
