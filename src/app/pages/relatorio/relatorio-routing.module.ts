import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { RelatorioComponent } from './relatorio.component';

const RELATORIO_ROUTES: Routes = [
  {
    path: '',
    component: RelatorioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(RELATORIO_ROUTES)],
  exports: [RouterModule],
})
export class RelatorioRoutingModule {}
