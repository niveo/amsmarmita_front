import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComedoresComponent } from './pages/comedores/comedores.component';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';
import { GrupoComponent } from './pages/grupos/grupos.component';
import { PratoComponent } from './pages/pratos/pratos.component';
import { MarmitasPedidosComponent } from './pages/marmitas/pedidos/marmitas-pedidos.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateTeam } from './auth/auth.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'marmitas',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'comedores',
    component: ComedoresComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'marmitas',
    component: MarmitasComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'grupos',
    component: GrupoComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'pratos',
    component: PratoComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'pedido',
    component: MarmitasPedidosComponent,
    canActivate: [canActivateTeam],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
