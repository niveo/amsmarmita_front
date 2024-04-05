import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { isBooleanTransform } from '../../common/util';
import { Grupo, Prato } from '../../model';
import { PratoStore } from '../../stores/prato.store';

export class ModelFormPrato {
  _id!: FormControl<string | null>;
  nome!: FormControl<string | null>;
  grupo!: FormControl<string | null>;
  composicoes!: FormControl<string[] | null>;
  observacao!: FormControl<string | null>;
  ingredientes!: FormControl<string[] | null>;
}

@Component({
  selector: 'app-pratos-component',
  templateUrl: './pratos.component.html',
  styleUrl: './pratos.component.scss',
})
export class PratoComponent {
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

  loading: Signal<boolean> = computed(() => this.pratoStore.loading());

  editarFormData = signal<any>(null);
  editarForm = false;

  constructor() {
    effect(() => {
      if (!this.tipoSelecao()) {
        this.pratoStore.vincularPedidoItem([]);
      }
    });
    this.data$ = this.pratoStore.data$.pipe(
      map((m) => (!this.tipoSelecao() ? m : m.filter((f) => f.principal))),
    );
  }

  novoPrato() {
    this.editar();
  }

  editar(item?: Prato) {
    this.editarFormData.set({ ...item });
    this.editarForm = true;
  }

  remover(item: Prato) {
    this.pratoStore.remover(item);
  }

  duplicar(item: Prato) {
    this.pratoStore.duplicar(item);
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
