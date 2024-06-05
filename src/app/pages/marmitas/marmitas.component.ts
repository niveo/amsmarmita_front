import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MarmitaService } from '@navegador/services/marmita.service';
import { Marmita } from '@navegador/model/marmita';
import { BaseContainerComponent } from '@navegador/componentes/base-container.component';
import { isSameMonth, isSameYear, parseISO, isAfter, isBefore } from 'date-fns';

@Component({
  selector: 'app-marmitas-component',
  templateUrl: './marmitas.component.html',
  styleUrl: './marmitas.component.scss',
})
export class MarmitasComponent extends BaseContainerComponent<Marmita> {
  override readonly service = inject(MarmitaService);

  atual = new Date();

  sortDate(a: Marmita, b: Marmita) {
    let aLancamento = parseISO(String(a.lancamento));
    let bLancamento = parseISO(String(b.lancamento));
    if (
      isSameMonth(aLancamento, this.atual) &&
      isSameYear(aLancamento, this.atual)
    )
      return -1;

    if (isAfter(aLancamento, bLancamento)) return -1;
    if (isBefore(aLancamento, bLancamento)) return 1;
    return 0;
  }

  data$: Observable<Marmita[]> = this.service!.data$.pipe(
    map((m) => m.sort((a, b) => this.sortDate(a, b))),
  );
}
