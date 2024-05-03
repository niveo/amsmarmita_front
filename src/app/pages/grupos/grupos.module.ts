import { NgModule } from '@angular/core';
import { GrupoComponent } from './grupos.component';
import { GrupoFormComponent } from './grupos-form.component';
import { CorBoardaDirective } from '@navegador/directives/cor-borda.directive';
import { NgxColorsModule } from 'ngx-colors';
import { GruposRoutingModule } from './grupos-routing.module';
import { GrupoPrincipalDirective } from '@navegador/directives/grupo-principal.directive';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [GrupoComponent, GrupoFormComponent],
  imports: [
    GruposRoutingModule,

    SharedModule,

    NgxColorsModule,

    CorBoardaDirective,
    GrupoPrincipalDirective,
  ],
})
export class GruposModule {}
