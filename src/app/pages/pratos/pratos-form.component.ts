import { Component, OnInit, inject, input, output } from '@angular/core';
import { Grupo, Prato } from '@navegador/model';
import { GrupoService } from '@navegador/services/grupo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelFormPrato } from './pratos.component';
import { validarFormulario } from '@navegador/common/util';
import { PratoStore } from '@navegador/stores/prato.store';
import { EMPTY, catchError, finalize } from 'rxjs';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pratos-form-component',
  templateUrl: './pratos-form.component.html',
})
export class PratosFormComponent implements OnInit {
  private readonly grupoService = inject(GrupoService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly _snackBar = inject(MatSnackBar);
  readonly pratoStore = inject(PratoStore);

  grupos?: Grupo[];

  announcer = inject(LiveAnnouncer);

  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  isConfirmLoading = false;
  data = input.required<Prato | null>();

  form: FormGroup<ModelFormPrato> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    grupo: ['', [Validators.required]],
    composicoes: [['']],
    observacao: ['', Validators.maxLength(100)],
    ingredientes: [['']],
    icone: ['', Validators.maxLength(50)],
    imagem: [''],
  });

  ngOnInit() {
    this.grupoService.data$.subscribe((response) => (this.grupos = response));

    const data = this.data()!;
    this.form.setValue({
      _id: data._id || '',
      grupo: data.grupo?._id || '',
      nome: data.nome || '',
      composicoes: data.composicoes || [],
      observacao: data.observacao || '',
      ingredientes: data.ingredientes || [],
      icone: data.icone || '',
      imagem: data.imagem || ''
    });
  }

  salvar() {
    if (!this.form.valid) {
      validarFormulario(this.form);
      return;
    }

    const data = this.form.value;

    this.pratoStore
      .salvar({
        _id: data._id,
        nome: data.nome!,
        composicoes: data.composicoes,
        grupo: data.grupo!,
        ingredientes: data.ingredientes,
        observacao: data.observacao,
        icone: data.icone
      })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._snackBar.open(MSG_ERRO_PROCSSAMENTO, 'OK');
          this.isConfirmLoading = false;
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: '',
            nome: '',
            grupo: '',
            composicoes: [],
            observacao: '',
            ingredientes: [],
            icone: '',
            imagem: ''
          });
          this.isConfirmLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.visibleChange.emit(false);
        },
      });
  }

  removeKeyword(keyword: string) {
    const index = this.form.value.composicoes!.indexOf(keyword);
    if (index >= 0) {
      this.form.value.composicoes!.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.form.value.composicoes!.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
