import { Component, inject, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import { ComedoresService } from '@navegador/services/comedores.service';
import { Comedor } from '@navegador/model/comedor';
import { isBooleanTransform } from '@navegador/common/util';
import { BaseContainerComponent } from '@navegador/componentes/base-container.component';

@Component({
  selector: 'app-comedores-component',
  templateUrl: './comedores.component.html',
  styleUrl: './comedores.component.scss', 
})
export class ComedoresComponent extends BaseContainerComponent<Comedor> {
  override readonly service = inject(ComedoresService);
  data$: Observable<Comedor[]> = this.service!.data$;

  tipoSelecao = input(false, { transform: isBooleanTransform });
  eventComedorTipoSelecao = output<string>();

  selecionarComedor(comedor: Comedor) {
    if (this.tipoSelecao()) this.eventComedorTipoSelecao.emit(comedor._id!);
  }
}
