import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MarmitaService } from '@navegador/services/marmita.service';
import { Marmita } from '@navegador/model/marmita';
import { BaseViewComponent } from '@navegador/componentes/base-view.component';

@Component({
  selector: 'app-marmitas-component',
  templateUrl: './marmitas.component.html',
  styleUrl: './marmitas.component.scss',
})
export class MarmitasComponent extends BaseViewComponent<Marmita> {
  override readonly service = inject(MarmitaService);
  data$: Observable<Marmita[]> = this.service!.data$;
}
