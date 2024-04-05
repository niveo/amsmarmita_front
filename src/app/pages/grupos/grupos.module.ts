import { NgModule } from '@angular/core';
import { GrupoComponent } from './grupos.component';
import { GrupoFormComponent } from './grupos-form.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
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

@NgModule({
  declarations: [GrupoComponent, GrupoFormComponent],
  imports: [
    NzSkeletonModule,
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
  ],
})
export class GruposModule {}
