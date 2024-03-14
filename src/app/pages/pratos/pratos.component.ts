import {
  Component,
  DestroyRef,
  Input,
  booleanAttribute,
  inject,
} from '@angular/core';
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
import { PratoStore } from '../../stores/prato.store';

@Component({
  selector: 'app-pratos-component',
  templateUrl: './pratos.component.html',
  styleUrl: './pratos.component.scss',
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

  private readonly pratoStore = inject(PratoStore);

  @Input({ transform: booleanAttribute })
  tipoSelecao = false;

  @Input()
  tipoSelecaoPratoActions: any;

  data$!: Observable<any[]>;
  loading = true;

  validateForm: FormGroup<{
    _id: FormControl<string>;
    nome: FormControl<string>;
    grupo: FormControl<string>;
    composicoes: FormControl<string[]>;
    observacao: FormControl<string>;
  }> = this.fb.group({
    _id: [''],
    nome: ['', [Validators.required, ...getFormValidacoes(50)]],
    grupo: ['', [Validators.required]],
    composicoes: [['']],
    observacao: ['', getFormValidacoes(100)],
  });

  constructor() {
    this.pratoStore.loading$
      .pipe(takeUntilDestroyed())
      .subscribe((loading) => (this.loading = loading));

    this.data$ = this.pratoStore.data$; 
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
        validateForm: this.validateForm,
      },
      nzOkText: 'Salvar',
      nzOnOk: () =>
        new Promise((resolve, reject) => this.salvar(resolve, reject)),
    });
  }

  remover(item: Prato) {
    this.pratoStore.remover(item);
  }

  duplicar(item: Prato) {
    this.pratoStore.duplicar(item);
  }

  salvar(resolve: (value: any) => void, reject: (error: any) => void) {
    if (!this.validateForm.valid) {
      validarFormulario(this.validateForm);
      reject('Informe os campos necessários');
      return;
    }

    const data = this.validateForm.value;

    this.pratoStore.salvar(
      data,
      (value) => {
        this.validateForm.setValue({
          _id: '',
          nome: '',
          grupo: '',
          composicoes: [],
          observacao: '',
        });
        resolve(value);
      },
      reject,
    );
  }
}
