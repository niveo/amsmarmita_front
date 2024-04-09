import { v1 } from 'uuid';
import {
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ComedoresService } from '../../services/comedores.service';
import { Comedor } from '../../model/comedor';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ERRO_PROCSSAMENTO,
} from '../../common/constantes';
import { isBooleanTransform } from '../../common/util';
import { ConfirmacaoDialog } from '../../common/confirmacao-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comedores-component',
  templateUrl: './comedores.component.html',
  styleUrl: './comedores.component.scss',
})
export class ComedoresComponent {
  private readonly service = inject(ComedoresService);
  protected readonly destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);

  protected readonly confirmacaoDialog = inject(ConfirmacaoDialog);

  data$: Observable<any[]> = this.service.data$;
  loading = computed(() => this.service.loading());

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
        this._snackBar.open(MSG_ERRO_PROCSSAMENTO);
      },
      next: () => {
        this._snackBar.open(MSG_EXCLUIR_SUCESSO);
      },
    });
  }

  removerRegistro(item: Comedor) {
    this.confirmacaoDialog
      .confirmacao({ mensagem: 'Deseja excluir o registro(s) selecionado(s)?' })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) this.remover(item);
      });
  }

  selecionarComedor(comedor: Comedor) {
    if (this.tipoSelecao()) this.eventComedorTipoSelecao.emit(comedor._id!);
  }
}
