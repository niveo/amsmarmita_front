import { NgModule } from '@angular/core';
import { AsyncPipe, NgStyle, NgTemplateOutlet } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidosAcompanhamentoComponent } from './acompanhamento/pedidos-companhamento.component';
import { PedidosComponent } from './pedidos.component';
import { PratosModule } from '../pratos/pratos.module';
import { SelecaoNumerosComponent } from '../../componentes/selecao-numeros.component';
import { CorBoardaDirective } from '../../directives/cor-borda.directive';
import { PedidosRoutingModule } from './pedidos-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PedidosItemComponent } from './pedidos-item.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    PedidosComponent,
    PedidosItemComponent,
    PedidosAcompanhamentoComponent,
  ],
  imports: [
    SelecaoNumerosComponent,
    CorBoardaDirective,

    ReactiveFormsModule,
    AsyncPipe,
    NgStyle,
    FormsModule,

    PedidosRoutingModule,

    NgTemplateOutlet,

    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,

    //Manter modulo no final para não entrar como rota
    PratosModule,
  ],
})
export class PedidosModule {}
