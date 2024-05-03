import { NgModule } from '@angular/core';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioItemComponent } from './relatorio-item.component';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioIngredienteComponent } from './relatorio-ingredientes.component';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioIngredienteComponent,
  ],
  imports: [RelatorioRoutingModule, SharedModule],
})
export class RelatorioModule {}
