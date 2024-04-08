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
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsProviderUserModule } from '../common/icons-provider-user.module';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-selecao-ingredientes-component',
  template: `<nz-select
      [nzDropdownRender]="renderTemplate"
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
    </nz-select>
    <ng-template #renderTemplate>
      <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
        <input
          type="text"
          nz-input
          placeholder="Informe aqui um novo ingrediente"
          #inputElement
        />
      </nz-input-group>
      <ng-template #suffixIconButton>
        <button
          nz-button
          nzType="primary"
          nzSearch
          (click)="addItem(inputElement)"
        >
          <span nz-icon nzType="save"></span>
        </button>
      </ng-template>
    </ng-template>`,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    AsyncPipe,
    NzInputModule,
    IconsProviderUserModule,
    NzButtonModule,
  ],
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

  addItem(input: HTMLInputElement) {
    this.service.inlcluir(input.value).subscribe();
  }
}
