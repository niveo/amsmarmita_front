import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PratoComponent } from './pratos.component';

const PRATOS_ROUTES: Routes = [
  {
    path: '',
    component: PratoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PRATOS_ROUTES)],
  exports: [RouterModule],
})
export class PratosRoutingModule {}
