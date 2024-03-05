import {
  Component, 
  OnInit, 
  inject,
} from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Grupo } from 'src/app/model';

@Component({
  selector: 'app-pratos-form-component',
  templateUrl: './pratos-form.component.html',
})
export class PratosFormComponent implements OnInit { 
  readonly nzModalData: any = inject(NZ_MODAL_DATA);

  grupos?: Grupo[];

  validateForm: any;

  composicoes: string[] = [];

  ngOnInit() {
    this.validateForm = this.nzModalData.validateForm;
    this.grupos = this.nzModalData.grupos;
  }

  atualizarComposicao(e: string[]) {
    this.validateForm.value.composicoes = e;
  }
}
