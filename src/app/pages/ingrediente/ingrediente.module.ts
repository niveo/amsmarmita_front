import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { AsyncPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteFormComponent } from './ingrediente-form.component';
import { IngredienteRoutingModule } from './ingrediente-routing.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
import { ConfirmacaoDialogModule } from 'src/app/common/confirmacao-dialog';
import { ContainerCentralComponent } from 'src/app/componentes/container-central.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [IngredienteComponent, IngredienteFormComponent],
  imports: [
    IngredienteRoutingModule,

    AsyncPipe,
    ReactiveFormsModule,

    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,

    ConfirmacaoDialogModule,
    ContainerCentralComponent,
  ],
})
export class IngredienteModule {}
