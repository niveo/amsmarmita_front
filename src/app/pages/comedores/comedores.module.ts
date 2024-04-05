import { NgModule } from '@angular/core';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzListModule } from 'ng-zorro-antd/list';
import { AsyncPipe, NgStyle } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderUserModule } from '../../common/icons-provider-user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ComedoresComponent } from './comedores.component';
import { ComedoresRoutingModule } from './comedores-routing.module';

@NgModule({
  declarations: [ComedoresComponent],
  exports:[ComedoresComponent],
  imports: [
    NzListModule,
    NzButtonModule,
    IconsProviderUserModule,
    NzInputModule,
    NgStyle,
    AsyncPipe,
    NzFormModule,
    NzSkeletonModule,
    ReactiveFormsModule,
    ComedoresRoutingModule
  ],
})
export class ComedoresModule {}
