import { Component, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { MarmitaService } from '@navegador/services/marmita.service';
import { Marmita } from '@navegador/model/marmita';
import { isAfter, format, parseJSON } from 'date-fns';
import { SelecaoComedoresComponent } from '@navegador/componentes/selecao-comedores.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MSG_CONFIRMAR_EXCLUSAO,
  MSG_ERRO_PROCSSAMENTO,
  MSG_EXCLUIR_SUCESSO,
} from '@navegador/common/constantes';
import { ConfirmacaoDialog } from '@navegador/common/confirmacao-dialog';

@Component({
  selector: 'app-marmitas-component',
  templateUrl: './marmitas.component.html',
  styleUrl: './marmitas.component.scss',
})
export class MarmitasComponent {
  private readonly service = inject(MarmitaService);
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _snackBar = inject(MatSnackBar);
  protected readonly confirmacaoDialog = inject(ConfirmacaoDialog);

  editarFormData = signal<any>(null);
  editarForm = false;
  loading = computed(() => this.service.loading());

  data$: Observable<Marmita[]> = this.service.data$;

  incluir() {
    this.editar();
  }

  editar(item?: Marmita) {
    const n = JSON.parse(JSON.stringify(item));
    this.editarFormData.set(n);
    this.editarForm = true;
  }

  remover(item: Marmita) {
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

  removerRegistro(item: Marmita) {
    this.confirmacaoDialog
      .confirmacao({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) this.remover(item);
      });
  }

  visualizarComedores(marmita: Marmita) {
    if (isAfter(new Date(), parseJSON(marmita.lancamento!))) {
      this._snackBar.open(
        `Essa marmita fechou dia ${format(parseJSON(marmita.lancamento!), 'dd/MM/yyyy')}!`,
        'OK',
        { duration: 3000 },
      );
      return;
    }

    this._bottomSheet.open(SelecaoComedoresComponent, {
      data: {
        marmitaId: marmita._id,
      },
    });
  }
}
