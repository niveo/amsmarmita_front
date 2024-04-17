import { NgModule } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PratosRoutingModule } from './pratos-routing.module';
import { PratosFormComponent } from './pratos-form.component';
import { PratoComponent } from './pratos.component';
import { CorBoardaDirective } from '@navegador/directives/cor-borda.directive';
import { SelecaoIngredientesComponent } from '@navegador/componentes/selecao-ingredientes.component';
import { CentralContainerComponent } from '@navegador/componentes/central-container.component';
import { AmsDialogModule } from '@navegador/common/confirmacao-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { GrupoPrincipalDirective } from '@navegador/directives/grupo-principal.directive';
import { UploadComponent } from '@navegador/componentes/upload.component';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';
import { ImagemComponent } from '@navegador/componentes/imagem.component';
import { CentralFormComponent } from '@navegador/componentes/central-form.component';

@NgModule({
  declarations: [PratoComponent, PratosFormComponent],
  exports: [PratoComponent],
  imports: [
    PratosRoutingModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgStyle,
    CorBoardaDirective,
    GrupoPrincipalDirective,
    SelecaoIngredientesComponent,
    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,

    CentralContainerComponent,
    CentralFormComponent,
    AmsDialogModule,
    ImagemComponent,
    UploadComponent,
  ],
  providers: [
    {
      provide: TOKEN_PATH_IMAGEKIT,
      useValue: '/amsmarmita/pratos',
    },
  ],
})
export class PratosModule {}
