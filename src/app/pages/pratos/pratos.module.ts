import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PratosRoutingModule } from './pratos-routing.module';
import { PratosFormComposicaoComponent } from './pratos-form-composicao.component';
import { PratosFormComponent } from './pratos-form.component';
import { PratoComponent } from './pratos.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CorBoardaDirective } from '../../directives/cor-borda.directive';
import { GrupoPrincipalComponent } from '../../componentes/grupo-principal.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelecaoIngredientesComponent } from '../../componentes/selecao-ingredientes.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
import { ContainerCentralComponent } from '../../componentes/container-central.component';
import { ConfirmacaoDialogModule } from '../../common/confirmacao-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    PratoComponent,
    PratosFormComponent,
    PratosFormComposicaoComponent,
  ],
  exports: [PratoComponent],
  imports: [
    PratosRoutingModule,
    NzInputModule,
    NzFormModule,
    NzDrawerModule,
    NzSelectModule,
    ReactiveFormsModule,
    IconsProviderUserModule,
    NzButtonModule,
    AsyncPipe,
    NzCardModule,
    NzTagModule,
    NzCollapseModule,
    CorBoardaDirective,
    GrupoPrincipalComponent,
    SelecaoIngredientesComponent,
    FormsModule,
    NzToolTipModule,
    NzPopconfirmModule,
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
