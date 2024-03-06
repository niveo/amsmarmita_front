import { Component, DestroyRef, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  finalize,
  iif,
  map,
  mergeMap,
  of,
  combineLatest,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  MSG_EXCLUIR_SUCESSO,
  MSG_ATUALIZADO_SUCESSO,
} from '../../common/constantes';
import { PratoService } from '../../services/prato.service';
import { Grupo, Prato } from '../../model';
import { GrupoService } from '../../services/grupo.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { getFormValidacoes, validarFormulario } from '../../common/util';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PratosFormComponent } from './pratos-form.component';

@Component({
  selector: 'app-pratos-component',
  templateUrl: './pratos.component.html',
  styles: [
    `
      .lbl-observacao {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 1.5715;
      }
    `,
  ],
})
export class PratoComponent {
  private readonly service = inject(PratoService);
  private readonly grupoService = inject(GrupoService);
  private readonly notify = inject(NzNotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly nzModalService = inject(NzModalService);

  data$!: Observable<any[]>;
  loading = true;
  loadingBtn = false;

  validateForm: FormGroup<{
    _id: FormControl<string>;
    nome: FormControl<string>;
    grupo: FormControl<string>;
    composicoes: FormControl<string[]>;
    observacao: FormControl<string>;
  }> = this.fb.group({
    _id: [''],
    nome: ['', getFormValidacoes(50)],
    grupo: ['', [Validators.required]],
    composicoes: [['']],
    observacao: ['', getFormValidacoes(100)],
  });

  grupos?: Grupo[];

  ngOnInit() {
    this.carregar();
  }

  private carregar() {
    this.loading = true;

    this.data$ = combineLatest([
      this.grupoService.getAll(),
      (this.data$ = this.service.getAll()),
    ])
      .pipe(finalize(() => (this.loading = false)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        catchError((error: any) => {
          this.notify.error('Erro', error.message);
          return EMPTY;
        })
      )
      .pipe(
        map((mp) => {
          this.grupos = mp[0];
          return mp[0].map((n) => {
            return {
              ...n,
              pratos: mp[1].filter((f) => f.grupo === n._id),
            };
          });
        })
      );
  }

  novoPrato() {
    this.validateForm.setValue({
      _id: '',
      grupo: '',
      nome: '',
      composicoes: [],
      observacao: '',
    });

    this.carregarModalEdicaoPrato();
  }

  novoPratoGrupo(item: Grupo) {
    this.validateForm.setValue({
      _id: '',
      grupo: item._id!,
      nome: '',
      composicoes: [],
      observacao: '',
    });

    this.carregarModalEdicaoPrato();
  }

  editar(item: Prato) {
    this.validateForm.setValue({
      _id: item._id || '',
      grupo: item.grupo!,
      nome: item.nome!,
      composicoes: item.composicoes || [],
      observacao: item.observacao || '',
    });
    this.carregarModalEdicaoPrato();
  }

  carregarModalEdicaoPrato() {
    this.nzModalService.create({
      nzContent: PratosFormComponent,
      nzData: {
        grupos: this.grupos,
        validateForm: this.validateForm,
      },
      nzOkText: 'Salvar',
      nzOnOk: () =>
        new Promise((resolve, reject) => this.salvar(resolve, reject)),
    });
  }

  remover(item: Prato) {
    this.loadingBtn = true;
    this.service
      .delete(item._id!)
      .pipe(
        finalize(() => {
          this.loadingBtn = false;
        })
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

  salvar(resolve: (value: any) => void, reject: (error: any) => void) {
    if (!this.validateForm.valid) {
      validarFormulario(this.validateForm);
      reject('Informe os campos necessários');
      return;
    }

    this.loadingBtn = true;

    const data = this.validateForm.value;

    of(this.validateForm.value._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir({
              nome: data.nome!,
              grupoId: data.grupo!,
              composicoes: data.composicoes,
              observacao: data.observacao,
            }),
            this.service.atualizar({
              id: value!,
              nome: data.nome!,
              grupoId: data.grupo!,
              composicoes: data.composicoes,
              observacao: data.observacao,
            })
          )
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);

          reject(error);

          return EMPTY;
        }),
        finalize(() => {
          this.loadingBtn = false;

          this.validateForm.setValue({
            _id: '',
            nome: '',
            grupo: '',
            composicoes: [],
            observacao: '',
          });

          resolve(true);
        })
      )
      .subscribe({
        next: () => {
          this.notify.success('Atualização', MSG_ATUALIZADO_SUCESSO);
          this.carregar();
        },
      });
  }
}
