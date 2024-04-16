import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { PedidoService } from '@navegador/services/pedido.service';

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
  acompanhamentos: any[] = [];
  ingredientes: any[] = [];

  totalPratos = 0;
  totalAcompanhamentos = 0;

  totalPratosRegistros = 0;
  totalAcompanhamentosRegistros = 0;

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ marmitaId }) => {
          this.loading.set(true);
          
          this.pedidoService
            .carregarRelatorio(marmitaId)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe((response) => {
              this.pratos = response.pratos;
              this.acompanhamentos = response.acompanhamentos;

              this.totalAcompanhamentosRegistros = this.acompanhamentos.length;
              this.totalAcompanhamentos = this.acompanhamentos.reduce(
                (previousValue: any, currentValue: any) => {
                  return previousValue + currentValue.quantidade;
                },
                0,
              );

              this.totalPratosRegistros = this.pratos.length;
              this.totalPratos = this.pratos.reduce(
                (previousValue: any, currentValue: any) => {
                  return previousValue + currentValue.quantidade;
                },
                0,
              );

              this.ingredientes = response.ingredientes;
            });
        }),
      )
      .subscribe();
  }
}
