import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComedoresComponent } from './pages/comedores/comedores.component';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';
import { GrupoComponent } from './pages/grupos/grupos.component';
import { PratoComponent } from './pages/pratos/pratos.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateTeam } from './auth/auth.service';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { IngredienteComponent } from './pages/ingrediente/ingrediente.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';

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
    component: PedidosComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'ingredientes',
    component: IngredienteComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'relatorio',
    component: RelatorioComponent,
    canActivate: [canActivateTeam],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
