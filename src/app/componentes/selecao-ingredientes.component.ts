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
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IngredienteModule } from '@navegador/pages/ingrediente/ingrediente.module';
import { IngredienteFormDialogComponent } from '@navegador/pages/ingrediente/ingrediente-form-dialog.component';

@Component({
  selector: 'app-selecao-ingredientes-component',
  template: `<div class="wf fx-row">
    <mat-form-field class="wf fx-flex">
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
        #dataInput
        [formControl]="ingredienteCtrl"
        [matChipInputFor]="chipGrid"
        [matAutocomplete]="auto"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        (matChipInputTokenEnd)="trigger.closePanel()"
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
    </mat-form-field>
    <button
      style="top: 5px;"
      matSuffix
      mat-icon-button
      (click)="lancarNovoIngrediente()"
    >
      <mat-icon>add</mat-icon>
    </button>
  </div>`,
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    IngredienteModule,
  ],
})
export class SelecaoIngredientesComponent {
  selecionados = input<string[]>([]);
  selecionadosChange = output<string[]>();
  private readonly service = inject(IngredienteService);
  private readonly modal = inject(MatDialog);

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
    this.service.data$.subscribe((response) => {
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

  lancarNovoIngrediente() {
    this.modal.open(IngredienteFormDialogComponent);
  }
}
