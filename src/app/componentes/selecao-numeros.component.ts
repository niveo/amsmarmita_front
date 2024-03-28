import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @for (i of numeros; track i) {
      <button
        nz-button
        style="width: 50px"
        [nzType]="selecionado === i ? 'primary' : 'default'"
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
  @Input({ required: true })
  numeros: number[] = [];

  @Input()
  selecionado?: number;

  @Output()
  selecionadoChange = new EventEmitter<number>();
}
