import { NgModule } from '@angular/core';
import { GrupoComponent } from './grupos.component';
import { GrupoFormComponent } from './grupos-form.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { CorBoardaDirective } from '../../directives/cor-borda.directive';
import { GrupoPrincipalComponent } from '../../componentes/grupo-principal.component';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GruposRoutingModule } from './grupos-routing.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
import { ContainerCentralComponent } from '../../componentes/container-central.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmacaoDialogModule } from 'src/app/common/confirmacao-dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxColorsModule } from 'ngx-colors';

@NgModule({
  declarations: [GrupoComponent, GrupoFormComponent],
  imports: [
    NzListModule,
    NzButtonModule,
    NzSwitchModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzColorPickerModule,
    NzDrawerModule,
    CorBoardaDirective,
    GrupoPrincipalComponent,
    AsyncPipe,
    IconsProviderUserModule,
    ReactiveFormsModule,
    GruposRoutingModule,
    NzToolTipModule,
    NzPopconfirmModule,
    ProgressBarComponent,

    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,

    NgxColorsModule,

    ConfirmacaoDialogModule,
    ContainerCentralComponent,
  ],
})
export class GruposModule {}
