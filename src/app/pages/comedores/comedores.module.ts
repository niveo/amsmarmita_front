import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { AsyncPipe, NgStyle } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ComedoresComponent } from './comedores.component';
import { ComedoresRoutingModule } from './comedores-routing.module';
import { ComedoresFormComponent } from './comedores-form.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';

@NgModule({
  declarations: [ComedoresComponent, ComedoresFormComponent],
  exports: [ComedoresComponent],
  imports: [
    NzListModule,
    NzButtonModule,
    NzDrawerModule,
    IconsProviderUserModule,
    NzInputModule,
    NgStyle,
    AsyncPipe,
    NzFormModule,
    ReactiveFormsModule,
    ComedoresRoutingModule,
    NzToolTipModule,
    NzPopconfirmModule,
    ProgressBarComponent,
  ],
})
export class ComedoresModule {}
