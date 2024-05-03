import { NgModule } from '@angular/core';
import { PratosRoutingModule } from './pratos-routing.module';
import { PratosFormComponent } from './pratos-form.component';
import { PratoComponent } from './pratos.component';
import { CorBoardaDirective } from '@navegador/directives/cor-borda.directive';
import { SelecaoIngredientesComponent } from '@navegador/componentes/selecao-ingredientes.component';
import { GrupoPrincipalDirective } from '@navegador/directives/grupo-principal.directive';
import { UploadComponent } from '@navegador/componentes/upload.component';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';
import { ImagemComponent } from '@navegador/componentes/imagem.component';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [PratoComponent, PratosFormComponent],
  exports: [PratoComponent],
  imports: [
    PratosRoutingModule,

    CorBoardaDirective,
    GrupoPrincipalDirective,
    SelecaoIngredientesComponent,

    SharedModule,

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
