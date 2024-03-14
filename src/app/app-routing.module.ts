import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComedoresComponent } from './pages/comedores/comedores.component';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';
import { GrupoComponent } from './pages/grupos/grupos.component';
import { PratoComponent } from './pages/pratos/pratos.component';
import { MarmitasPedidosComponent } from './pages/marmitas/marmitas-pedidos.component';

const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full',
    redirectTo: 'marmitas'
  },
  {
    path: 'comedores',
    component: ComedoresComponent,
  },
  {
    path: 'marmitas',
    component: MarmitasComponent,
  },
  {
    path: 'grupos',
    component: GrupoComponent,
  },
  {
    path: 'pratos',
    component: PratoComponent,
  },
  {
    path: 'pedido',
    component: MarmitasPedidosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
