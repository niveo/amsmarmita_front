import { isAfter, parseJSON, format } from 'date-fns';
import { Component, inject, input, output } from '@angular/core';
import { Marmita } from '@navegador/model';
import { SelecaoComedoresComponent } from '@navegador/componentes/selecao-comedores.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NotificationService } from 'amslib';
import { RelatorioService } from '@navegador/services/relatorio.service';
@Component({
  selector: 'app-marmitas-item-component',
  templateUrl: './marmitas-item.component.html',
  styles: [
    `
      .mat-mdc-button > .mat-icon {
        margin-right: 0px;
        margin-left: 0px;
      }
    `,
  ],
})
export class MarmitasItemComponent {
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _messageService = inject(NotificationService);
  private readonly _relatorioService = inject(RelatorioService);

  item = input.required<Marmita>();

  editar = output<Marmita>();
  remover = output<string>();

  visualizarComedores() {
    if (this.validarLancamento()) {
      this._messageService.warning(
        `Essa marmita fechou dia ${format(parseJSON(this.item().lancamento!), 'dd/MM/yyyy')}!`,
      );
      return;
    }

    this._bottomSheet.open(SelecaoComedoresComponent, {
      data: {
        marmitaId: this.item()._id,
      },
    });
  }

  validarLancamento(){
    return isAfter(new Date(), parseJSON(this.item().lancamento!))
  }

  carregarRelatorioPdf(marmitaId: string) {
    this._relatorioService.carregarRelatorioPdf(marmitaId);
  }
}
