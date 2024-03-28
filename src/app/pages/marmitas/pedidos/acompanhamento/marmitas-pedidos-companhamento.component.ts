import { Component, Input, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { Grupo } from 'src/app/model';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-marmitas-pedidos-acompanhamento-component',
  templateUrl: './marmitas-pedidos-companhamento.component.html',
  styles: [`
     .lbl-titulo-grupo {
        font-weight: bold;
        border-bottom: 1px solid #01579B;
        margin-bottom: 5px;
      }
  `]
})
export class MarmitasPedidosAcompanhamentoComponent {
  private readonly grupoService = inject(GrupoService);

  pratosSimples?: Grupo[];
  pratosGeral?: Grupo[];
  sortPrincipal = (a: Grupo, b: Grupo) => Number(a.principal) - Number(b.principal);

  @Input()
  selecoes = new Set<string>();

  selecionados = [];

  constructor() {
    this.grupoService.data$
      .pipe(
        map((m) => {
          return [m.filter((f) => f.multiplo), m.filter((f) => !f.multiplo).sort(this.sortPrincipal)];
        }),
      )
      .subscribe((data) => {
        this.pratosSimples = data[0];
        this.pratosGeral = data[1];
      });
  }

  selecaoContem(i: string) {
    return [...this.selecoes].includes(i)
  }

  changeGeral(id: string) {
    if (this.selecoes.has(id)) {
      this.selecoes.delete(id);
    } else {
      this.selecoes.add(id);
    }
  }
}
