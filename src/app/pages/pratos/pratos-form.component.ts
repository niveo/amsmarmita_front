import { Component, OnInit, inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Grupo } from '../../model';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-pratos-form-component',
  templateUrl: './pratos-form.component.html',
})
export class PratosFormComponent implements OnInit {
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  private readonly grupoService = inject(GrupoService);
  grupos?: Grupo[];

  validateForm: any;

  composicoes: string[] = [];

  ngOnInit() {
    this.validateForm = this.nzModalData.validateForm;
    this.grupoService.data$.subscribe((response) => (this.grupos = response));
  }

  atualizarComposicao(e: string[]) {
    console.log(e);
    
    this.validateForm.value.composicoes = e;
  }
}
