import { PedidosComponent } from './pedidos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const PEDIDOS_ROUTES: Routes = [
  {
    path: '',
    component: PedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PEDIDOS_ROUTES)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
