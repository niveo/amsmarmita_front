import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PedidosAcompanhamentoComponent } from './acompanhamento/pedidos-companhamento.component';
import { PedidosComponent } from './pedidos.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PratosModule } from '../pratos/pratos.module';
import { SelecaoNumerosComponent } from '../../componentes/selecao-numeros.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CorBoardaDirective } from '../../directives/cor-borda.directive';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [PedidosComponent, PedidosAcompanhamentoComponent],
  imports: [
    NzTabsModule,
    NzDrawerModule,
    NzCollapseModule,
    NzRadioModule,
    PratosModule,
    NzButtonModule,
    NzCheckboxModule,
    IconsProviderUserModule,
    SelecaoNumerosComponent,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    ReactiveFormsModule,
    CorBoardaDirective,
    AsyncPipe,
    FormsModule,
    PedidosRoutingModule,
    NzToolTipModule,
    NzPopconfirmModule
  ],
})
export class PedidosModule {}
