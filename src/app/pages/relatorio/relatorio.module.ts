import { NgModule } from '@angular/core';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioItemComponent } from './relatorio-item.component';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioIngredienteComponent } from './relatorio-ingredientes.component';
import { SharedModule } from '@navegador/shared.module';
import { RelatorioComedoresComponent } from './relatorio-comedores.component';
import { NgClass } from '@angular/common';

@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioIngredienteComponent,
    RelatorioComedoresComponent,
  ],
  imports: [RelatorioRoutingModule, SharedModule, NgClass],
})
export class RelatorioModule { }
