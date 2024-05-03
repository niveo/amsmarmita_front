import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs';
import { RelatorioService } from '@navegador/services/relatorio.service';

@Component({
  selector: 'app-relatorio-component',
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss',
})
export class RelatorioComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly relatorioService = inject(RelatorioService);

  loading = signal(true);

  pratos: any[] = [];
  comedores: any[] = [];
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

          this.relatorioService
            .carregarRelatorioView(marmitaId)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe((response) => {
              this.pratos = response.pratos;
              this.acompanhamentos = response.acompanhamentos;
              this.comedores = response.comedores;

              this.totalAcompanhamentosRegistros = this.acompanhamentos.length;
              this.totalAcompanhamentos = this.acompanhamentos.reduce(
                (previousValue: any, currentValue: any) => {
                  return (
                    previousValue +
                    (currentValue.grupo.naoSomarRelatorioView
                      ? 0
                      : currentValue.quantidade)
                  );
                },
                0,
              );

              this.totalPratosRegistros = this.pratos.length;
              this.totalPratos = this.pratos.reduce(
                (previousValue: any, currentValue: any) => {
                  return (
                    previousValue +
                    (currentValue.grupo.naoSomarRelatorioView
                      ? 0
                      : currentValue.quantidade)
                  );
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
