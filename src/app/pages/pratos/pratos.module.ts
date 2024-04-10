import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PratosRoutingModule } from './pratos-routing.module';
import { PratosFormComposicaoComponent } from './pratos-form-composicao.component';
import { PratosFormComponent } from './pratos-form.component';
import { PratoComponent } from './pratos.component';
import { CorBoardaDirective } from '../../directives/cor-borda.directive';
import { GrupoPrincipalComponent } from '../../componentes/grupo-principal.component';
import { SelecaoIngredientesComponent } from '../../componentes/selecao-ingredientes.component';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
import { ContainerCentralComponent } from '../../componentes/container-central.component';
import { ConfirmacaoDialogModule } from '../../common/confirmacao-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PratoComponent,
    PratosFormComponent,
    PratosFormComposicaoComponent,
  ],
  exports: [PratoComponent],
  imports: [
    PratosRoutingModule,
    ReactiveFormsModule,
    AsyncPipe,
    CorBoardaDirective,
    GrupoPrincipalComponent,
    SelecaoIngredientesComponent,
    FormsModule,
    ProgressBarComponent,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,

    ContainerCentralComponent,
    ConfirmacaoDialogModule,
  ],
})
export class PratosModule {}
