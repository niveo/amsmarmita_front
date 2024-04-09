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
import { ConfirmacaoDialogModule } from '../../common/confirmacao-dialog';
import { ContainerCentralComponent } from '../../componentes/container-central.component';

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
  ],
})
export class ComedoresModule {}
