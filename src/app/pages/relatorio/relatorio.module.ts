import { NgModule } from '@angular/core';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioItemComponent } from './relatorio-item.component';
import { RelatorioComponent } from './relatorio.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { GrupoPrincipalComponent } from '../../componentes/grupo-principal.component';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { RelatorioIngredienteComponent } from './relatorio-ingredientes.component';
@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioIngredienteComponent,
  ],
  imports: [
    RelatorioRoutingModule,
    NzTabsModule,
    NzTagModule,
    NzCollapseModule,
    GrupoPrincipalComponent,
    ProgressBarComponent,
    IconsProviderUserModule,
  ],
})
export class RelatorioModule {}
