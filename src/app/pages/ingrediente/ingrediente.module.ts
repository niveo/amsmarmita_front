import { NgModule } from '@angular/core';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteFormComponent } from './ingrediente-form.component';
import { IngredienteRoutingModule } from './ingrediente-routing.module';
import { SharedModule } from '@navegador/shared.module';
import { IngredienteFormDialogComponent } from './ingrediente-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MedidaNomePipe } from '@navegador/pipes/medidanome.pipe';
import { CorBoardaDirective } from '@navegador/directives/cor-borda.directive';

@NgModule({
  declarations: [
    IngredienteComponent,
    IngredienteFormDialogComponent,
    IngredienteFormComponent,
  ],
  imports: [IngredienteRoutingModule, SharedModule, MatDialogModule, MedidaNomePipe, CorBoardaDirective],
  exports: [IngredienteFormComponent],
})
export class IngredienteModule {}
