import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GrupoService } from '@navegador/services/grupo.service';
import { Grupo } from '@navegador/model/grupo';
import { BaseContainerComponent } from '@navegador/componentes/base-container.component';

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
})
export class GrupoComponent extends BaseContainerComponent<Grupo> {
  override readonly service = inject(GrupoService);
  data$: Observable<Grupo[]> = this.service!.data$;
}
