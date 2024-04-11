import { NgModule } from '@angular/core';
import { GrupoComponent } from './grupos.component';
import { GrupoFormComponent } from './grupos-form.component';
import { CorBoardaDirective } from '../../directives/cor-borda.directive';
import { GrupoPrincipalComponent } from '../../componentes/grupo-principal.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContainerCentralComponent } from '../../componentes/container-central.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmacaoDialogModule } from '@navegador/common/confirmacao-dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxColorsModule } from 'ngx-colors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GruposRoutingModule } from './grupos-routing.module';

@NgModule({
  declarations: [GrupoComponent, GrupoFormComponent],
  imports: [
    CorBoardaDirective,
    GrupoPrincipalComponent,
    AsyncPipe,
    ReactiveFormsModule,

    GruposRoutingModule,

    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule,

    NgxColorsModule,

    ConfirmacaoDialogModule,
    ContainerCentralComponent,
  ],
})
export class GruposModule {}
