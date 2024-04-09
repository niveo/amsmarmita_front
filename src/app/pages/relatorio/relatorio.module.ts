import { NgModule } from '@angular/core';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioItemComponent } from './relatorio-item.component';
import { RelatorioComponent } from './relatorio.component'; 
import { RelatorioIngredienteComponent } from './relatorio-ingredientes.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioIngredienteComponent,
  ],
  imports: [
    RelatorioRoutingModule,

    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,

    NgStyle, 
  ],
})
export class RelatorioModule {}
