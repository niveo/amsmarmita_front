import { Component, inject } from '@angular/core';
import { IngredienteService } from '@navegador/services/ingrediente.service';
import { Ingrediente } from '@navegador/model';
import { BaseContainerComponent } from '@navegador/componentes/base-container.component';
import { map } from 'rxjs';
import { TipoIngrediente } from '@navegador/enuns/tipoingrediente.enum';

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

  corTipoIngrediente(tipo) {
    switch (tipo) {
      case TipoIngrediente.MERCADO:
        return '#8D6E63'
      case TipoIngrediente.CARNE_FRIOS:
        return '#F44336'
      case TipoIngrediente.LEGUME_VERDURA:
        return '#66BB6A'
      case TipoIngrediente.TEMPERO:
        return '#FFCC80'
      default:
        return '#EEEEEE'
    }
  }
}
