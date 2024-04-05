import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-relatorio-component',
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss',
})
export class RelatorioComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoService = inject(PedidoService);

  pratosPrincipais: any[] = [];
  pratosAcompanhamento: any[] = [];
  pratosGeral: any[] = [];

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ marmitaId }) => {
          this.pedidoService
            .carregarRelatorio(marmitaId)
            .pipe(
              map((m) => [
                m.pratos.filter((f: any) => f.principal),
                m.pratos.filter((f: any) => !f.principal),
                m.geral,
              ]),
            )
            .subscribe((response) => {
              this.pratosPrincipais = response[0];
              this.pratosAcompanhamento = response[1];
              this.pratosGeral = response[2];
            });
        }),
      )
      .subscribe();
  }
}
