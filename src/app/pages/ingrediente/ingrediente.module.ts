import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteFormComponent } from './ingrediente-form.component';
import { IngredienteRoutingModule } from './ingrediente-routing.module';
import { AmsDialogModule } from '@navegador/common/confirmacao-dialog';
import { CentralContainerComponent } from '@navegador/componentes/central-container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LongPressDirective } from '@navegador/directives/long-press.directive'; 
import { CentralFormComponent } from '@navegador/componentes/central-form.component';

@NgModule({
  declarations: [IngredienteComponent, IngredienteFormComponent],
  imports: [
    IngredienteRoutingModule,

    AsyncPipe,
    ReactiveFormsModule,

    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule, 

    AmsDialogModule,
    CentralContainerComponent,
    CentralFormComponent,
    LongPressDirective,
  ],
})
export class IngredienteModule {}
