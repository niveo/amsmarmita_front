import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredienteService } from '../services/ingrediente.service';
import { BehaviorSubject, take } from 'rxjs';
import { Ingrediente } from '../model';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-selecao-ingredientes-component',
  template: `<mat-form-field class="wf">
    <mat-label>Ingredientes</mat-label>
    <mat-chip-grid #chipGrid>
      @for (ingrediente of dataFilter$ | async; track ingrediente._id) {
        <mat-chip-row (removed)="remove(ingrediente)">
          {{ ingrediente.nome }}
          <button matChipRemove>
            <mat-icon>cancel</mat-icon>
          </button>
        </mat-chip-row>
      }
    </mat-chip-grid>
    <input
      placeholder="Novo Ingrediente"
      #dataInput
      [formControl]="ingredienteCtrl"
      [matChipInputFor]="chipGrid"
      [matAutocomplete]="auto"
      [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
      (matChipInputTokenEnd)="add($event); trigger.closePanel()"
    />
    <mat-autocomplete
      #auto="matAutocomplete"
      (optionSelected)="selected($event.option.value)"
    >
      @for (ingrediente of data$ | async; track ingrediente._id) {
        <mat-option [value]="ingrediente._id">{{
          ingrediente.nome
        }}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>`,
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class SelecaoIngredientesComponent {
  selecionados = input<string[]>([]);
  selecionadosChange = output<string[]>();
  private readonly service = inject(IngredienteService);

  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredienteCtrl = new FormControl('');

  private readonly _dataSource = new BehaviorSubject<Ingrediente[]>([]);
  readonly data$ = this._dataSource.asObservable();

  private readonly _dataSourceFilter = new BehaviorSubject<Ingrediente[]>([]);
  readonly dataFilter$ = this._dataSourceFilter.asObservable();

  sortNome = (a: Ingrediente, b: Ingrediente) => a.nome.localeCompare(b.nome);

  @ViewChild('dataInput') dataInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;

  allIngredientes: Ingrediente[] = [];

  constructor() {
    //take para limitar o carregamento caso tenha atualização no serviço que usa cache
    this.service.data$.pipe(take(1)).subscribe((response) => {
      this.allIngredientes = response;
      this.carregarIngredienteSelecionados(this.selecionados());
    });

    effect(() => {
      //Passar o selecionados() para agitar a arvore de dados na emissão do change
      this.carregarIngredienteSelecionados(this.selecionados());
    });
  }

  carregarIngredienteSelecionados(selecionados: string[]) {
    if (!(this.allIngredientes.length > 0)) return;

    this._dataSourceFilter.next(
      this.allIngredientes
        .filter((f) => selecionados.includes(f._id))
        .sort(this.sortNome),
    );

    this._dataSource.next(
      this.allIngredientes
        .filter((f) => !selecionados.includes(f._id))
        .sort(this.sortNome),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    this.service.inlcluir(value).subscribe((response: Ingrediente) => {
      // Add our fruit
      if (value) {
        this.allIngredientes.push(response);
        this.selecionadosChange.emit([...this.selecionados(), response._id]);
      }

      // Clear the input value
      event.chipInput!.clear();

      this.ingredienteCtrl.setValue(null);
    });
  }

  remove(ingrediente: Ingrediente): void {
    const index = this.selecionados().findIndex((f) => f === ingrediente._id);

    if (index >= 0) {
      this.selecionados().splice(index, 1);
      this.selecionadosChange.emit([...this.selecionados()]);
    }
  }

  selected(value: string): void {
    this.selecionadosChange.emit([...this.selecionados(), value]);

    this.dataInput.nativeElement.value = '';
    this.ingredienteCtrl.setValue(null);
  }
}
