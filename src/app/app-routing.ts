import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './pages/login/login.component';
import { canActivateTeam } from './auth/auth.service'; 

const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'marmitas'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'comedores',
    loadChildren: () =>
      import('./pages/comedores/comedores.module').then(
        (m) => m.ComedoresModule
      ),
    canActivate: [canActivateTeam]
  },
  {
    path: 'marmitas',
    loadChildren: () =>
      import('./pages/marmitas/marmitas.module').then((m) => m.MarmitasModule),
    canActivate: [canActivateTeam]
  },
  {
    path: 'grupos',
    loadChildren: () =>
      import('./pages/grupos/grupos.module').then((m) => m.GruposModule),
    canActivate: [canActivateTeam]
  },
  {
    path: 'pratos',
    loadChildren: () =>
      import('./pages/pratos/pratos.module').then((m) => m.PratosModule),
    canActivate: [canActivateTeam]
  },
  {
    path: 'pedido',
    loadChildren: () =>
      import('./pages/pedidos/pedidos.module').then((m) => m.PedidosModule),
    canActivate: [canActivateTeam]
  },
  {
    path: 'ingredientes',
    loadChildren: () =>
      import('./pages/ingrediente/ingrediente.module').then(
        (m) => m.IngredienteModule,
      ),
    canActivate: [canActivateTeam]
  },
  {
    path: 'relatorio',
    loadChildren: () =>
    import('./pages/relatorio/relatorio.module').then(
      (m) => m.RelatorioModule,
    ),
    canActivate: [canActivateTeam]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
