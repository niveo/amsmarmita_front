import { NgModule } from '@angular/core';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteFormComponent } from './ingrediente-form.component';
import { IngredienteRoutingModule } from './ingrediente-routing.module';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [IngredienteComponent, IngredienteFormComponent],
  imports: [IngredienteRoutingModule, SharedModule],
})
export class IngredienteModule {}
