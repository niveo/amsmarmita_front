import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GrupoService } from '@navegador/services/grupo.service';
import { Grupo } from '@navegador/model/grupo';
import { BaseViewComponent } from '@navegador/componentes/base-view.component';
import { SERVICO_GENERICO_TOKEN } from '@navegador/common/tokens';

@Component({
  selector: 'app-grupos-component',
  templateUrl: './grupos.component.html',
  styles: [
    `
      :host {
        background-color: white;
        height: 100%;
      }
    `,
  ],
  providers: [
    {
      provide: SERVICO_GENERICO_TOKEN,
      useClass: GrupoService,
    },
  ],
})
export class GrupoComponent extends BaseViewComponent<Grupo> {
  data$: Observable<Grupo[]> = this.service!.data$;
}
