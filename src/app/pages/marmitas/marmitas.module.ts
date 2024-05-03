import { NgModule } from '@angular/core';
import { MarmitasComponent } from './marmitas.component';
import { MarmitasRoutingModule } from './marmitas-routing.module';
import { MarmitasFormComponent } from './marmitas-form.component';
import { MarmitasItemComponent } from './marmitas-item.component';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [
    MarmitasComponent,
    MarmitasItemComponent,
    MarmitasFormComponent,
  ],
  imports: [MarmitasRoutingModule, SharedModule],
})
export class MarmitasModule {}
