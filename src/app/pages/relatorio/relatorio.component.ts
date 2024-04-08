import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-relatorio-component',
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss',
})
export class RelatorioComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pedidoService = inject(PedidoService);
  loading = signal(true);

  pratos: any[] = [];
  ingredientes: any[] = [];

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ marmitaId }) => {
          this.pedidoService
            .carregarRelatorio(marmitaId)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe((response) => {
              this.pratos = response.pratos;
              this.ingredientes = response.ingredientes;
            });
        }),
      )
      .subscribe();
  }
}
