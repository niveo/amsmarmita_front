import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ComedoresComponent } from './comedores.component';

const routes: Routes = [
  {
    path: '',
    component: ComedoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComedoresRoutingModule {}
