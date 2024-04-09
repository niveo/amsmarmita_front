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
import { Marmita } from '../../model';
import { MarmitaService } from '../../services/marmita.service';

@Component({
  selector: 'app-marmitas-form-component',
  templateUrl: './marmitas-form.component.html',
})
export class MarmitasFormComponent {
  private readonly service = inject(MarmitaService);
  private readonly notify = inject(NzNotificationService);
  private readonly formBuilder = inject(FormBuilder);

  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  isConfirmLoading = false;
  data = input.required<Marmita>();

  form: FormGroup<{
    _id: FormControl<string | null>;
    lancamento: FormControl<any | null>;
    observacao: FormControl<string | null>;
  }> = this.formBuilder.group({
    _id: [''],
    lancamento: [ '', [Validators.required]],
    observacao: ['', Validators.maxLength(100)],
  });

  ngOnInit() {
    this.form.setValue({
      _id: this.data()._id || '',
      lancamento: this.data().lancamento || null,
      observacao: this.data().observacao || '',
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
            this.service.inlcluir(data.lancamento!, data.observacao),
            this.service.atualizar(value!, data.lancamento!, data.observacao),
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
            lancamento: null,
            observacao: null,
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
