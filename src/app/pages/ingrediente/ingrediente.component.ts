import { Component, inject } from '@angular/core';
import { IngredienteService } from '@navegador/services/ingrediente.service';
import { Ingrediente } from '@navegador/model';
import { BaseContainerComponent } from '@navegador/componentes/base-container.component';

@Component({
  selector: 'app-ingrediente-component',
  templateUrl: './ingrediente.component.html',
  styles: [
    `
      :host {
        height: 100%;
        background-color: white;
      }
    `,
  ],
})
export class IngredienteComponent extends BaseContainerComponent<Ingrediente> {
  override readonly service = inject(IngredienteService);
  data$ = this.service!.data$;
}
