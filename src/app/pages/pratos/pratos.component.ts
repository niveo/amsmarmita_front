import {
  Component,
  Output,
  Signal,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, iif, map } from 'rxjs';
import {
  getFormValidacoes,
  isBooleanTransform,
  validarFormulario,
} from '../../common/util';
import { Grupo, Prato } from '../../model';
import { PratoStore } from '../../stores/prato.store';
import { PratosFormComponent } from './pratos-form.component';

@Component({
  selector: 'app-pratos-component',
  templateUrl: './pratos.component.html',
  styleUrl: './pratos.component.scss',
})
export class PratoComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly nzModalService = inject(NzModalService);
  readonly pratoStore = inject(PratoStore);

  eventIncluirPratoPedido = output<{
    nome: string;
    pratoId: string;
    grupoId: string;
  }>();

  tipoSelecao = input(false, {
    transform: isBooleanTransform,
  });

  data$!: Observable<Grupo[]>;

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

  loading: Signal<boolean> = computed(() => this.pratoStore.loading());

  constructor() {
    this.data$ = this.pratoStore.data$.pipe(
      map((m) => (!this.tipoSelecao() ? m : m.filter((f) => f.principal))),
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
      grupo: item.grupo!._id,
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

  incluirPratoPedido(prato: Prato) {
    if (!this.tipoSelecao()) return;
    this.eventIncluirPratoPedido.emit({
      nome: prato.nome!,
      grupoId: prato.grupo!._id,
      pratoId: prato._id!,
    });
  }
}
