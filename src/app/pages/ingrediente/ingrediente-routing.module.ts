import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { IngredienteComponent } from './ingrediente.component';

const routes: Routes = [
  {
    path: '',
    component: IngredienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredienteRoutingModule {}
