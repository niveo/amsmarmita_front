import { NgModule } from '@angular/core';

import { AsyncPipe, NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComedoresComponent } from './comedores.component';
import { ComedoresRoutingModule } from './comedores-routing.module';
import { ComedoresFormComponent } from './comedores-form.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmacaoDialogModule } from '../../common/confirmacao-dialog';

@NgModule({
  declarations: [ComedoresComponent, ComedoresFormComponent],
  exports: [ComedoresComponent],
  imports: [
    NgStyle,
    AsyncPipe,

    ReactiveFormsModule,
    ComedoresRoutingModule,
    ConfirmacaoDialogModule,

    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class ComedoresModule {}
