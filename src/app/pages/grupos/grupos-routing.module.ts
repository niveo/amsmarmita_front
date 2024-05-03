import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoComponent } from './grupos.component';

const GRUPOS_ROUTES: Routes = [
  {
    path: '',
    component: GrupoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(GRUPOS_ROUTES)],
  exports: [RouterModule],
})
export class GruposRoutingModule {}
