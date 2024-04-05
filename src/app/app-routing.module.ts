import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComedoresComponent } from './pages/comedores/comedores.component';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivateTeam } from './auth/auth.service';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
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
    loadChildren: () =>
      import('./pages/grupos/grupos.module').then((m) => m.GruposModule),
    canActivate: [canActivateTeam],
  },
  {
    path: 'pratos',
    loadChildren: () =>
      import('./pages/pratos/pratos.module').then((m) => m.PratosModule),
    canActivate: [canActivateTeam],
  },
  {
    path: 'pedido',
    component: PedidosComponent,
    canActivate: [canActivateTeam],
  },
  {
    path: 'ingredientes',
    loadChildren: () =>
      import('./pages/ingrediente/ingrediente.module').then(
        (m) => m.IngredienteModule,
      ),
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
