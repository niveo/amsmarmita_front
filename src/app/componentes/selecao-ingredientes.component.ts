import {
  Component,
  OnInit,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IngredienteService } from '../services/ingrediente.service';
import { Observable } from 'rxjs';
import { Ingrediente } from '../model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-selecao-ingredientes-component',
  template: `<nz-select
    nzBorderless
    [ngModel]="selecionados()"
    (ngModelChange)="selecionadosChange.emit($event)"
    nzMode="tags"
    title="Ingredientes"
    nzPlaceHolder="Selecione os ingredientes"
  >
    @for (item of data$ | async; track item._id) {
      <nz-option [nzLabel]="item.nome" [nzValue]="item._id"></nz-option>
    }
  </nz-select>`,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [NzSelectModule, FormsModule, AsyncPipe],
})
export class SelecaoIngredientesComponent implements OnInit {
  tagValue: string[] = [];

  selecionados = input<string[]>([]);
  selecionadosChange = output<string[]>();

  data$!: Observable<Ingrediente[]>;

  private readonly service = inject(IngredienteService);

  constructor() {
    this.data$ = this.service.data$;
  }

  ngOnInit() {
    this.tagValue = this.selecionados();
  }
}
