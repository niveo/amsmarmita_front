import { Component, input } from '@angular/core';

@Component({
  selector: 'app-relatorio-item-component',
  templateUrl: './relatorio-item.component.html',
  styles: [
    `
      .lbl-item-titulo {
        font-weight: bold;
      }

      .item-inner {
        margin-left: 20px;
        margin-right: 20px;
        padding:  10px;
        border-bottom: 1px solid #07363d;
        border-left: 5px solid #07363d;
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
export class RelatorioItemComponent {
  registros = input.required<any[]>(); 
  acompanhamento = input(false); 
}
