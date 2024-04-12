import { Component, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import { ComedoresService } from '@navegador/services/comedores.service';
import { Comedor } from '@navegador/model/comedor';
import { isBooleanTransform } from '@navegador/common/util';
import { BaseViewComponent } from '@navegador/componentes/base-view.component';
import { SERVICO_GENERICO_TOKEN } from '@navegador/common/tokens';

@Component({
  selector: 'app-comedores-component',
  templateUrl: './comedores.component.html',
  styleUrl: './comedores.component.scss',
  providers: [
    {
      provide: SERVICO_GENERICO_TOKEN,
      useClass: ComedoresService,
    },
  ],
})
export class ComedoresComponent extends BaseViewComponent<Comedor> {
  data$: Observable<Comedor[]> = this.service!.data$;

  tipoSelecao = input(false, { transform: isBooleanTransform });
  eventComedorTipoSelecao = output<string>();

  selecionarComedor(comedor: Comedor) {
    if (this.tipoSelecao()) this.eventComedorTipoSelecao.emit(comedor._id!);
  }
}
