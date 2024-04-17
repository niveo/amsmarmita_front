import { NgModule } from '@angular/core';
import { GrupoComponent } from './grupos.component';
import { GrupoFormComponent } from './grupos-form.component';
import { CorBoardaDirective } from '@navegador/directives/cor-borda.directive';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CentralContainerComponent } from '@navegador/componentes/central-container.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AmsDialogModule } from '@navegador/common/confirmacao-dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxColorsModule } from 'ngx-colors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GruposRoutingModule } from './grupos-routing.module';
import { GrupoPrincipalDirective } from '@navegador/directives/grupo-principal.directive';
import { LongPressDirective } from '@navegador/directives/long-press.directive';
import { CentralFormComponent } from '@navegador/componentes/central-form.component';

@NgModule({
  declarations: [GrupoComponent, GrupoFormComponent],
  imports: [
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

    CorBoardaDirective,
    GrupoPrincipalDirective,
    LongPressDirective,
    AmsDialogModule,
    CentralContainerComponent,
    CentralFormComponent
  ],
})
export class GruposModule {}
