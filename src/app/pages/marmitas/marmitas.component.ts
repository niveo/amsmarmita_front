import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MarmitaService } from '@navegador/services/marmita.service';
import { Marmita } from '@navegador/model/marmita';
import { BaseViewComponent } from '@navegador/componentes/base-view.component';
import { SERVICO_GENERICO_TOKEN } from '@navegador/common/tokens';

@Component({
  selector: 'app-marmitas-component',
  templateUrl: './marmitas.component.html',
  styleUrl: './marmitas.component.scss',
  providers: [
    {
      provide: SERVICO_GENERICO_TOKEN,
      useClass: MarmitaService,
    },
  ],
})
export class MarmitasComponent extends BaseViewComponent<Marmita> {
  data$: Observable<Marmita[]> = this.service!.data$;
}
