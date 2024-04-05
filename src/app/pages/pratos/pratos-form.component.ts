import { Component, OnInit, inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Grupo } from '../../model';
import { GrupoService } from '../../services/grupo.service';
import { FormGroup } from '@angular/forms';
import { ModelFormPrato } from './pratos.component';

@Component({
  selector: 'app-pratos-form-component',
  templateUrl: './pratos-form.component.html',
})
export class PratosFormComponent implements OnInit {
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  private readonly grupoService = inject(GrupoService);
  grupos?: Grupo[];

  validateForm!: FormGroup<ModelFormPrato>;

  ngOnInit() {
    this.validateForm = this.nzModalData.validateForm;
    this.grupoService.data$.subscribe((response) => (this.grupos = response));
  }
}
