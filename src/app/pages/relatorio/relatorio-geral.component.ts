import { Component, input } from '@angular/core';

@Component({
  selector: 'app-relatorio-geral-component',
  templateUrl: './relatorio-geral.component.html',
  styles: [
    `
      .lbl-item-titulo {
        font-weight: bold;
      }

      .item-inner {
        margin-left: 20px;
        margin-right: 20px;
        padding:  10px;
        border-bottom: 1px solid gray;
        border-left: 5px solid gray;
      }

      .item-inner span {
        font-weight: 900;
      }

      .item-inner-quantidade {
        padding-right: 10px; padding-left: 10px; font-size: 25px
      }
    `,
  ],
})
export class RelatorioGeralComponent {
  registros = input.required<any[]>(); 
}
