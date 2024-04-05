import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarmitasComponent } from './marmitas.component';

const routes: Routes = [
  {
    path: '',
    component: MarmitasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarmitasRoutingModule {}
