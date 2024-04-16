import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { isBooleanTransform } from '@navegador/common/util';
import { Prato } from '@navegador/model';
import { PratoStore } from '@navegador/stores/prato.store';
import { BaseViewComponent } from '@navegador/componentes/base-view.component'; 
import { PratoService } from '@navegador/services/prato.service';

export class ModelFormPrato {
  _id!: FormControl<string | null>;
  nome!: FormControl<string | null>;
  grupo!: FormControl<string | null>;
  composicoes!: FormControl<string[] | null>;
  observacao!: FormControl<string | null>;
  ingredientes!: FormControl<string[] | null>;
  icone!: FormControl<string | null>;
  imagem!: FormControl<string | null>;
}

@Component({
  selector: 'app-pratos-component',
  templateUrl: './pratos.component.html',
  styleUrl: './pratos.component.scss',
})
export class PratoComponent extends BaseViewComponent<Prato> {

  override readonly service = inject(PratoService);
  
  readonly pratoStore = inject(PratoStore);

  eventIncluirPratoPedido = output<{
    nome: string;
    pratoId: string;
    grupoId: string;
  }>();

  tipoSelecao = input(false, {
    transform: isBooleanTransform,
  });

  data$ = this.pratoStore.data$.pipe(
    map((m) => (!this.tipoSelecao() ? m : m.filter((f) => f.principal))),
  );

  override loading: Signal<boolean> = computed(() => this.pratoStore.loading());

  constructor() {
    super();
    effect(() => {
      if (!this.tipoSelecao()) {
        this.pratoStore.vincularPedidoItem([]);
      }
    });
  }

  override remover(registroId: string) {
    this.pratoStore.remover(registroId);
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
