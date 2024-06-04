import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
  daysSelected: any[] = [];

  private registros: Marmita[] = [];

  @ViewChild('calendar') calendar: MatCalendar<Date>;

  myFilter = (d: Date | null): boolean => {
    return isAfter(d, new Date());
  };

  constructor() {
    super();
    this.registroRemovidoSuccess.subscribe((registroId) => {
      const registroIndex = this.registros.findIndex(
        (f) => f._id === registroId,
      );
      const index = this.daysSelected.findIndex(
        (x) => x == this.formatarData(this.registros[registroIndex].lancamento),
      );
      this.daysSelected.splice(index, 1);
      this.registros.splice(registroIndex, 1);
      this.calendar.updateTodaysDate();
    });
  }

  registroAtualizadoSuccess(registro: Marmita) {
    this.registros.push(registro);
    this.daysSelected.push(this.formatarData(registro.lancamento));
    this.calendar.updateTodaysDate();
  }

  ngOnInit(): void {
    this.service
      .listarDatas()
      .pipe(finalize(() => this.calendar.updateTodaysDate()))
      .subscribe({
        next: (response) => {
          this.registros = response;
          this.daysSelected = response.map((m) =>
            this.formatarData(m.lancamento),
          );
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
    return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  };

  select(event: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);

    const index = this.daysSelected.findIndex((x) => x == date);

    if (index < 0) {
      const m = new Marmita();
      m.lancamento = event;
      this.editar(m);
    } else {
      const registro = this.registros.find(
        (f) => this.formatarData(f.lancamento) === date,
      );
      if (isMarmitaExpirada(registro.lancamento)) {
        this._messageService.warning(
          msgTextMarmitaExpirada(registro.lancamento),
        );
        return;
      }
      super.removerRegistro(registro._id);
    }
  }

  private formatarData(lancamento: any) {
    return formatISO(parseISO(String(lancamento)), { representation: 'date' });
  }
}
