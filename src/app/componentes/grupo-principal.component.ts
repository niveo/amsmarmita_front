import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-grupo-principal-component',
  template: `
    <div
      class="item"
      [ngStyle]="{ background: principal() ? cor() : '#d9d9d9' }"
    ></div>
  `,
  styles: `
    .item {
      width: 5px;
      height: 25%;
      margin-right: 5px; 
    }
    :host {
      align-items: center;
      display: flex;
    }
  `,
  standalone: true,
  imports: [NgStyle],
})
export class GrupoPrincipalComponent {
  principal = input.required<boolean>();
  cor = input<string>('#C5CAE9');
}
