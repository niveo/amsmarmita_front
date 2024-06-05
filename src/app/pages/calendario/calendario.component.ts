import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BaseContainerComponent } from '@navegador/componentes/base-container.component';
import { Marmita } from '@navegador/model';
import { MarmitaService } from '@navegador/services/marmita.service';
import { SharedModule } from '@navegador/shared.module';
import { finalize } from 'rxjs';
import { MarmitasModule } from '../marmitas/marmitas.module';
import { formatISO, parseISO, isAfter } from 'date-fns';
import {
  isMarmitaExpirada,
  msgTextMarmitaExpirada,
} from '@navegador/common/util';
import { SelecaoComedoresComponent } from '@navegador/componentes/selecao-comedores.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-calendario-component',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  standalone: true,
  imports: [MarmitasModule, SharedModule],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarioComponent
  extends BaseContainerComponent<Marmita>
  implements OnInit
{
  override readonly service = inject(MarmitaService);
  private readonly _bottomSheet = inject(MatBottomSheet);

  private registros: Marmita[] = [];

  @ViewChild('calendar') calendar: MatCalendar<Date>;

  myFilter = (d: Date | null): boolean => {
    return isAfter(d, new Date());
  };

  ngOnInit(): void {
    this.service
      .listarDatas()
      .pipe(finalize(() => this.calendar.updateTodaysDate()))
      .subscribe({
        next: (response) => {
          this.registros = response;
        },
      });
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.registros.find((x) => this.formatarData(x.lancamento) == date)
      ? 'selected'
      : null;
  };

  select(event: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);

    const registro = this.registros.find(
      (x) => this.formatarData(x.lancamento) == date,
    );

    if (isMarmitaExpirada(registro.lancamento)) {
      this._messageService.warning(msgTextMarmitaExpirada(registro.lancamento));
      return;
    }

    this._bottomSheet.open(SelecaoComedoresComponent, {
      data: {
        marmitaId: registro._id,
      },
    });
  }

  private formatarData(lancamento: any) {
    return formatISO(parseISO(String(lancamento)), { representation: 'date' });
  }
}
