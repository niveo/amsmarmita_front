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
import { validarFormulario } from '../../common/util';

@Component({
  selector: 'app-pratos-component',
  templateUrl: './pratos.component.html',
})
export class PratoComponent {
  private readonly service = inject(PratoService);
  private readonly grupoService = inject(GrupoService);
  private readonly notify = inject(NzNotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);

  data$!: Observable<any[]>;
  loading = true;
  loadingBtn = false;

  validateForm: FormGroup<{
    _id: FormControl<string>;
    nome: FormControl<string>;
    grupo: FormControl<string>;
  }> = this.fb.group({
    _id: [''],
    nome: ['', [Validators.required]],
    grupo: ['', [Validators.required]],
  });

  isVisible = false;

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

  novoPratoGrupo(item: Grupo) {
    console.log(item._id);
    this.validateForm.setValue({
      _id: '',
      grupo: item._id!,
      nome: '',
    });
    this.isVisible = true;
  }

  editar(item: Prato) {
    this.validateForm.setValue({
      _id: item._id || '',
      grupo: item.grupo!,
      nome: item.nome!,
    });
    this.isVisible = true;
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

  salvar() {
    if (!this.validateForm.valid) {
      validarFormulario(this.validateForm);
      return;
    }

    this.loadingBtn = true;

    const data = this.validateForm.value;

    of(this.validateForm.value._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir(data.nome!, data.grupo!),
            this.service.atualizar(value!, data.nome!, data.grupo!)
          )
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error('Erro', error.message);
          return EMPTY;
        }),
        finalize(() => {
          this.loadingBtn = false;

          this.validateForm.setValue({
            _id: '',
            nome: '',
            grupo: '',
          });

          this.isVisible = false;
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
