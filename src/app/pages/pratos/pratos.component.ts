import {
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  Observable,
} from 'rxjs';
import { getFormValidacoes, validarFormulario } from '../../common/util';
import { Grupo, Prato } from '../../model';
import { PratoStore } from '../../stores/prato.store';
import { PratosFormComponent } from './pratos-form.component';

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
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly nzModalService = inject(NzModalService);
  private readonly pratoStore = inject(PratoStore);

  @Output()
  eventIncluirPratoPedido = new EventEmitter<string>();

  @Output()
  eventRemoverPratoPedido = new EventEmitter<any>();

  @Output()
  eventEditarPratoPedido = new EventEmitter<any>();

  @Input({ transform: booleanAttribute })
  tipoSelecao = false;

  data$!: Observable<any[]>;
  loading = true;

  validateForm: FormGroup<{
    id: FormControl<string>;
    nome: FormControl<string>;
    grupo: FormControl<string>;
    composicoes: FormControl<string[]>;
    observacao: FormControl<string>;
  }> = this.fb.group({
    id: [''],
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
      id: '',
      grupo: '',
      nome: '',
      composicoes: [],
      observacao: '',
    });

    this.carregarModalEdicaoPrato();
  }

  novoPratoGrupo(item: Grupo) {
    this.validateForm.setValue({
      id: '',
      grupo: item._id!,
      nome: '',
      composicoes: [],
      observacao: '',
    });

    this.carregarModalEdicaoPrato();
  }

  editar(item: Prato) {
    this.validateForm.setValue({
      id: item._id || '',
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
          id: '',
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
    this.eventIncluirPratoPedido.emit(prato._id);
  }

  removerPratoPedido(prato: Prato) {
    this.eventRemoverPratoPedido.emit({ pedidoId: prato.pedido._id, pratoId: prato._id });
  }

  editarPratoPedido(prato: Prato) {
    this.eventEditarPratoPedido.emit({ pedidoId: prato.pedido._id, pratoId: prato._id });
  }
}
