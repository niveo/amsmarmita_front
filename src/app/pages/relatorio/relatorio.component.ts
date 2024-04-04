import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-relatorio-component',
  templateUrl: './relatorio.component.html',
})
export class RelatorioComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoService = inject(PedidoService);

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ marmitaId }) => {
            console.log(marmitaId);
            
          this.pedidoService
            .carregarRelatorio(marmitaId)
            .subscribe((response) => {
              console.log(response);
            });
        }),
      )
      .subscribe();
  }
}
