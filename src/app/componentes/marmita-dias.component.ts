import { Component, input } from '@angular/core';
import { Marmita } from '@navegador/model';

@Component({
  selector: 'app-marmita-dias-componet',
  template: ` @if (registro() && registro().diasCorridos) {
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        font-size: 12px;
        color: gray;
      "
    >
      <div>Corridos</div>
      <div>Úteis</div>
      <div>Próxima</div>
      <span> {{ registro().diasCorridos }} Dias</span>
      <span> {{ registro().diasUteis }} Dias</span>
      <span> {{ registro().diasCorridosProxima }} Dias</span>
    </div>
  }`,
  standalone: true,
})
export class MarmitaDiasComponent {
  registro = input<Marmita>();
}
