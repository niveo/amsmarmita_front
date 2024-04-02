import {
  Component,
  input,
  output,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-selecao-numeros-component',
  template: `<div
    nz-flex
    [nzGap]="'small'"
    [nzWrap]="'wrap'"
    style="justify-content: center"
  >
    @for (i of numeros(); track i) {
      <button
        nz-button
        style="width: 50px"
        [nzType]="selecionado() === i ? 'primary' : 'default'"
        (click)="selecionadoChange.emit(i)"
      >
        {{ i }}
      </button>
    }
  </div>`,
  standalone: true,
  imports: [NzButtonModule, NzFlexModule],
})
export class SelecaoNumerosComponent {
  numeros = input.required<number[]>();

  selecionado = input<number>();

  selecionadoChange = output<number>();
}
