import { Component, Inject, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AsyncPipe } from '@angular/common';
import { ComedoresService } from '../services/comedores.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-selecao-comedores-component',
  template: `
    <mat-selection-list
      #shoes
      [hideSingleSelectionIndicator]="true"
      [multiple]="false"
    >
      @for (item of data$ | async; track item._id) {
        <mat-list-option (click)="comedorTipoSelecao(item._id)">
          <mat-icon matListItemIcon>launch</mat-icon>
          {{ item.nome }}</mat-list-option
        >
      }
    </mat-selection-list>
    @if (loading()) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
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
  imports: [AsyncPipe, MatListModule, MatIconModule, MatProgressBarModule],
})
export class SelecaoComedoresComponent {
  private readonly service = inject(ComedoresService);
  loading = computed(() => this.service.loading());

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
