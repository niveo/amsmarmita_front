import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-selecao-numeros-component',
  template: `<div
    style="display: flex;
  place-content: center;
  flex-wrap: wrap;"
  >
    @for (i of numeros(); track i) {
      @if (selecionado() === i) {
        <button mat-flat-button color="primary">{{ i }}</button>
      } @else {
        <button mat-button (click)="selecionadoChange.emit(i)">
          {{ i }}
        </button>
      }
    }
  </div>`,
  standalone: true,
  imports: [MatButtonModule],
})
export class SelecaoNumerosComponent {
  numeros = input.required<number[]>();

  selecionado = input<number>();

  selecionadoChange = output<number>();
}
