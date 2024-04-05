import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PratoComponent } from './pratos.component';

const routes: Routes = [
  {
    path: '',
    component: PratoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PratosRoutingModule {}
