import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarmitasComponent } from './marmitas.component';

const MARMITAS_ROUTES: Routes = [
  {
    path: '',
    component: MarmitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(MARMITAS_ROUTES)],
  exports: [RouterModule],
})
export class MarmitasRoutingModule {}
