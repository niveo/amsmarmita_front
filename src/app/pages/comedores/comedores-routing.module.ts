import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ComedoresComponent } from './comedores.component';

const COMEDORES_ROUTES: Routes = [
  {
    path: '',
    component: ComedoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(COMEDORES_ROUTES)],
  exports: [RouterModule],
})
export class ComedoresRoutingModule {}
