import { Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, catchError, finalize, iif, mergeMap, of } from 'rxjs';
import { LBL_ERRO, MSG_ERRO_PROCSSAMENTO } from '../../common/constantes';
import { Comedor } from '../../model'; 
import { ComedoresService } from '../../services/comedores.service';

@Component({
  selector: 'app-comedores-form-component',
  templateUrl: './comedores-form.component.html', 
})
export class ComedoresFormComponent {
  private readonly service = inject(ComedoresService);
  private readonly notify = inject(NzNotificationService);
  private readonly formBuilder = inject(FormBuilder);

  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  isConfirmLoading = false;
  data = input.required<Comedor>();

  form: FormGroup<{
    _id: FormControl<string | null>;
    nome: FormControl<string | null>;
  }> = this.formBuilder.group({
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
    ],
  });

  ngOnInit() {
    this.form.setValue({
      _id: this.data()._id || '',
      nome: this.data().nome || '',
    });
  }

  salvar() {
    if (!this.form.valid) return;

    const data = this.form.value;

    this.isConfirmLoading = true;

    of(data._id)
      .pipe(
        mergeMap((value) =>
          iif(
            () => !value,
            this.service.inlcluir(data.nome!),
            this.service.atualizar(value!, data.nome!),
          ),
        ),
        catchError((error: any) => {
          console.error(error);
          this.notify.error(LBL_ERRO, MSG_ERRO_PROCSSAMENTO);
          this.isConfirmLoading = false;
          return EMPTY;
        }),
        finalize(() => {
          this.form.setValue({
            _id: null,
            nome: '',
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
}
