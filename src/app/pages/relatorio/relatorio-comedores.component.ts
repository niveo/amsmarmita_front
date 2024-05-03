import { Component, input } from '@angular/core';

@Component({
    selector: 'app-relatorio-comedores-component',
  templateUrl: './relatorio-comedores.component.html',
})
export class RelatorioComedoresComponent {
    registros = input.required<any[]>(); 
}
