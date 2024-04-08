import { NgModule } from '@angular/core';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioGeralComponent } from './relatorio-geral.component';
import { RelatorioItemComponent } from './relatorio-item.component';
import { RelatorioComponent } from './relatorio.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { GrupoPrincipalComponent } from '../../componentes/grupo-principal.component';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioGeralComponent,
  ],
  imports: [
    RelatorioRoutingModule,
    NzTabsModule,
    NzCollapseModule,
    GrupoPrincipalComponent,
    ProgressBarComponent
  ],
})
export class RelatorioModule {}
