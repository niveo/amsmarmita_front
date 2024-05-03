import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { IngredienteComponent } from './ingrediente.component';

const INGREDIENTES_ROUTES: Routes = [
  {
    path: '',
    component: IngredienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(INGREDIENTES_ROUTES)],
  exports: [RouterModule],
})
export class IngredienteRoutingModule {}
