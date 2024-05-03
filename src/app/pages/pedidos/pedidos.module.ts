import { NgModule } from '@angular/core';
import { PedidosAcompanhamentoComponent } from './acompanhamento/pedidos-companhamento.component';
import { PedidosComponent } from './pedidos.component';
import { PratosModule } from '../pratos/pratos.module';
import { SelecaoNumerosComponent } from '@navegador/componentes/selecao-numeros.component';
import { CorBoardaDirective } from '@navegador/directives/cor-borda.directive';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosItemComponent } from './pedidos-item.component';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [
    PedidosComponent,
    PedidosItemComponent,
    PedidosAcompanhamentoComponent,
  ],
  imports: [
    PedidosRoutingModule,

    SelecaoNumerosComponent,
    CorBoardaDirective,

    SharedModule,

    //Manter modulo no final para não entrar como rota
    PratosModule,
  ],
})
export class PedidosModule {}
