import { Component, DestroyRef, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  finalize,
  iif,
  mergeMap,
  of,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ATUALIZADO_SUCESSO,
  FORMATO_DATA,
  LBL_ALERTA,
} from '../../common/constantes';
import { MarmitaService } from '../../services/marmita.service';
import { Marmita } from '../../model/marmita';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MarmitasComedoresComponent } from './marmitas-comedores.component';
import { isAfter, format, parseJSON } from 'date-fns';

@Component({
  selector: 'app-marmitas-component',
  templateUrl: './marmitas.component.html',
  styleUrl: './marmitas.component.scss',
})
export class MarmitasComponent {
  private readonly comedoreService = inject(MarmitaService);
  private readonly notify = inject(NzNotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzModalService = inject(NzModalService);

  data$!: Observable<any[]>;
  loading = true;
  isVisible = false;

  dateFormat = FORMATO_DATA;

  marmitaId?: string;
  marmitaLancamento?: Date;
  marmitaObservacao?: string;

  ngOnInit() {
    this.carregar();
  }

  private carregar() {
    this.loading = true;
    this.data$ = this.comedoreService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        catchError((error: any) => {
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
      )
      .pipe(finalize(() => (this.loading = false)));
  }

  editar(item: Marmita) {
    this.marmitaLancamento = item.lancamento;
    this.marmitaObservacao = item.observacao;
    this.marmitaId = item._id;
    this.isVisible = true;
  }

  remover(item: Marmita) {
    this.loading = true;
    this.comedoreService
      .delete(item._id!)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        error: (error) => {
          console.error(error);
          this.notify.error('Erro', error.message);
        },
        next: (value) => {
          console.log(value);
          this.notify.success('Remoção', MSG_EXCLUIR_SUCESSO);
          this.carregar();
        },
      });
  }

  salvar() {
    if (!this.marmitaLancamento) return;

    this.loading = true;

    return of(this.marmitaId!)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.comedoreService.inlcluir(
              this.marmitaLancamento!,
              this.marmitaObservacao,
            ),
            this.comedoreService.atualizar(
              value,
              this.marmitaLancamento!,
              this.marmitaObservacao,
            ),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
          this.isVisible = false;
          this.marmitaLancamento = undefined;
          this.marmitaObservacao = undefined;
          this.marmitaId = undefined;
        }),
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.notify.success('Atualização', MSG_ATUALIZADO_SUCESSO);
          this.carregar();
        },
      });
  }

  visualizarComedores(marmita: Marmita) { 

    if (isAfter(new Date(), parseJSON(marmita.lancamento!))) {
      this.notify.warning(
        LBL_ALERTA,
        `Essa marmita fechou dia ${format(parseJSON(marmita.lancamento!), 'dd/MM/yyyy')}!`,
      );
      return;
    }
    this.nzModalService.create({
      nzClosable: false,
      nzContent: MarmitasComedoresComponent,

      nzFooter: [
        {
          label: 'Sair',
          onClick: function (componentInstance) {
            componentInstance?.sair();
          },
        },
      ],
      nzData: {
        marmitaId: marmita._id,
      },
    });
  }
}
