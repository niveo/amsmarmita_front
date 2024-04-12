import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredienteService } from '@navegador/services/ingrediente.service';
import { Ingrediente } from '@navegador/model';
import { BaseViewComponent } from '@navegador/componentes/base-view.component';
import { SERVICO_GENERICO_TOKEN } from '@navegador/common/tokens';

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
  providers: [
    {
      provide: SERVICO_GENERICO_TOKEN,
      useClass: IngredienteService,
    },
  ],
})
export class IngredienteComponent extends BaseViewComponent<Ingrediente> {
  data$ = this.service!.data$;

  constructor() {
    super();

    this.data$.subscribe(console.log);
  }
}
