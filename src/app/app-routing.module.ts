import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComedoresComponent } from './pages/comedores/comedores.component';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';

const routes: Routes = [
  {
    path: 'comedores',
    component: ComedoresComponent,
  },
  {
    path: 'marmitas',
    component: MarmitasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
