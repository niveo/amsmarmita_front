import { NgModule } from '@angular/core'; 
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MarmitasComponent } from './marmitas.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ComedoresModule } from '../comedores/comedores.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MarmitasRoutingModule } from './marmitas-routing.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ProgressBarComponent } from '../../componentes/progress-bar.component';
@NgModule({
  declarations: [MarmitasComponent],
  exports: [],
  imports: [ 
    NzDrawerModule,
    NzModalModule,
    NzButtonModule,
    IconsProviderUserModule,
    NzCardModule,
    NzDatePickerModule,
    NzInputModule,
    FormsModule,
    DatePipe,
    AsyncPipe,
    MarmitasRoutingModule,
    NzToolTipModule,
    NzPopconfirmModule,
    ProgressBarComponent,

    //Manter modulo no final para não entrar como rota
    ComedoresModule,
  ],
})
export class MarmitasModule {}
