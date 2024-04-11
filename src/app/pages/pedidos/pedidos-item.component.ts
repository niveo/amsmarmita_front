import { Component, input, output } from '@angular/core';
import { PedidoItem } from '@navegador/model';

@Component({
  selector: 'app-pedidos-item-component',
  templateUrl: './pedidos-item.component.html',
})
export class PedidosItemComponent {
  item = input.required<PedidoItem>();

  editarPedidoItem = output<string>();

  removerPedidoItem = output<string>();
}
