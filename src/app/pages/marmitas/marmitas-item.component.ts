import { isAfter, parseJSON, format } from 'date-fns';
import { Component, inject, input, output } from '@angular/core';
import { Marmita } from '@navegador/model';
import { SelecaoComedoresComponent } from '@navegador/componentes/selecao-comedores.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private readonly _snackBar = inject(MatSnackBar);

  item = input.required<Marmita>();

  editar = output<Marmita>();
  remover = output<string>();

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
