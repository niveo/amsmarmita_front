import { NgModule } from '@angular/core';

import { AsyncPipe, NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComedoresComponent } from './comedores.component';
import { ComedoresRoutingModule } from './comedores-routing.module';
import { ComedoresFormComponent } from './comedores-form.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmacaoDialogModule } from '@navegador/common/confirmacao-dialog';
import { ContainerCentralComponent } from '@navegador/componentes/container-central.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [ComedoresComponent, ComedoresFormComponent],
  exports: [ComedoresComponent],
  imports: [
    NgStyle,
    AsyncPipe,

    ReactiveFormsModule,
    ComedoresRoutingModule,
    ConfirmacaoDialogModule,
    ContainerCentralComponent,

    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
})
export class ComedoresModule {}
