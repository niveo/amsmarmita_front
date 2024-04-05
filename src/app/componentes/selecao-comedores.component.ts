import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzListModule } from 'ng-zorro-antd/list';
import { AsyncPipe } from '@angular/common';
import { ComedoresService } from '../services/comedores.service';
import { Observable } from 'rxjs';
import { IconsProviderUserModule } from '../common/icons-provider-user.module';

@Component({
  selector: 'app-selecao-comedores-component',
  template: `
    <nz-list nzItemLayout="horizontal" nzSize="large">
      @for (item of data$ | async; track item._id) {
        <nz-list-item
          (click)="comedorTipoSelecao(item._id)"
          style="cursor: pointer;"
        >
          <nz-list-item-meta>
            <nz-list-item-meta-title>
              {{ item.nome }}
            </nz-list-item-meta-title>
          </nz-list-item-meta>

          <ul nz-list-item-actions>
            <nz-list-item-action>
              <span nz-icon nzType="select" nzTheme="outline"></span>
            </nz-list-item-action>
          </ul>
        </nz-list-item>
      }
    </nz-list>
  `,
  styles: [
    `
      :host {
        height: 400px;
        display: block;
      }
    `,
  ],
  standalone: true,
  imports: [NzListModule, AsyncPipe, IconsProviderUserModule],
})
export class SelecaoComedoresComponent {
  private readonly service = inject(ComedoresService);

  constructor(
    private drawerRef: NzDrawerRef<string>,
    @Inject(NZ_DRAWER_DATA) public nzData: { marmitaId: string },
  ) {}

  data$: Observable<any[]> = this.service.data$;

  private readonly router = inject(Router);
  comedorTipoSelecao(comedorId: string) {
    this.router.navigate([
      'pedido',
      {
        comedorId: comedorId,
        marmitaId: this.nzData.marmitaId,
      },
    ]);
    this.drawerRef.close();
  }

  sair() {
    this.drawerRef.close();
  }
}
