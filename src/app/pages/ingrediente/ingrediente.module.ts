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

@NgModule({
  declarations: [IngredienteComponent, IngredienteFormComponent],
  imports: [
    IngredienteRoutingModule,
    NzListModule,
    NzButtonModule,
    IconsProviderUserModule,
    AsyncPipe, 
    ReactiveFormsModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzToolTipModule,
    NzPopconfirmModule,
    ProgressBarComponent
  ],
})
export class IngredienteModule {}
