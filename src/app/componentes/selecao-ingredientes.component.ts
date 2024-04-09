import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredienteService } from '../services/ingrediente.service';
import { Observable } from 'rxjs';
import { Ingrediente } from '../model';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-selecao-ingredientes-component',
  template: `<mat-form-field class="example-form-field">
    <mat-label>Video keywords</mat-label>
    <mat-chip-grid
      #chipGrid
      aria-label="Enter keywords"
      [formControl]="formControl"
    >
      @for (keyword of keywords; track keyword) {
        <mat-chip-row (removed)="removeKeyword(keyword)">
          {{ keyword }}
          <button matChipRemove aria-label="'remove ' + keyword">
            <mat-icon>cancel</mat-icon>
          </button>
        </mat-chip-row>
      }
    </mat-chip-grid>
    <input
      placeholder="New keyword..."
      [matChipInputFor]="chipGrid"
      (matChipInputTokenEnd)="add($event)"
    />
  </mat-form-field>`,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
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
    this.service.inlcluir(input.value).subscribe(() => (input.value = ''));
  }

  keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];
  formControl = new FormControl(['angular']);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
