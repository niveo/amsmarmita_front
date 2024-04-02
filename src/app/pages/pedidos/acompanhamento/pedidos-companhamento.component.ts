import {
  Component, 
  inject,
  output,
  input,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { GrupoService } from '../../../services/grupo.service';
import { Grupo } from '../../../model';

@Component({
  selector: 'app-pedidos-acompanhamento-component',
  templateUrl: './pedidos-companhamento.component.html',
  styles: [
    `
      .lbl-titulo-grupo {
        font-weight: bold;
        border-bottom: 1px solid #01579b;
        margin-bottom: 5px;
      }
    `,
  ],
})
export class PedidosAcompanhamentoComponent implements OnInit {
  private readonly grupoService = inject(GrupoService);

  pratosSimples?: Grupo[];
  pratosGeral?: Grupo[];
  sortPrincipal = (a: Grupo, b: Grupo) =>
    Number(a.principal) - Number(b.principal);

  acompanhamento = input.required<string[]>();
  acompanhamentoChange = output<string[]>();

  selecoes!: Set<string>;

  constructor() {
    this.grupoService.data$
      .pipe(
        map((m) => {
          return [
            m.filter((f) => f.multiplo),
            m.filter((f) => !f.multiplo).sort(this.sortPrincipal),
          ];
        }),
      )
      .subscribe((data) => {
        this.pratosSimples = data[0];
        this.pratosGeral = data[1];
      });
  }

  ngOnInit() {
    this.selecoes = new Set<string>(this.acompanhamento());
  }

  selecaoContem(i: string) {
    return [...this.selecoes].includes(i);
  }

  changeGeral(id: string) {
    if (this.selecoes.has(id)) {
      this.selecoes.delete(id);
    } else {
      this.selecoes.add(id);
    }
     this.acompanhamentoChange.emit([...this.selecoes]);
    // this.acompanhamento.
  }
}
