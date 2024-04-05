import { v1 } from 'uuid';
import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ComedoresService } from '../../services/comedores.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Comedor } from '../../model/comedor';
import {
  MSG_EXCLUIR_SUCESSO,
  LBL_ERRO,
  LBL_EXCLUSAO,
} from '../../common/constantes';
import { isBooleanTransform } from '../../common/util';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comedores-component',
  templateUrl: './comedores.component.html',
  styleUrl: './comedores.component.scss',
})
export class ComedoresComponent {
  private readonly service = inject(ComedoresService);
  private readonly notify = inject(NzNotificationService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  data$: Observable<any[]> = this.service.data$;
  loading = signal(false);

  tipoSelecao = input(false, { transform: isBooleanTransform });
  eventComedorTipoSelecao = output<string>();

  editarFormData = signal<any>(null);
  editarForm = false;

  incluir() {
    this.editar();
  }

  editar(item?: Comedor) {
    this.editarFormData.set({ ...item });
    this.editarForm = true;
  }

  remover(item: Comedor) {
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

  selecionarComedor(comedor: Comedor) {
    if (this.tipoSelecao()) this.eventComedorTipoSelecao.emit(comedor._id!);
  }
}
