import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ComedoresService } from '../services/comedores.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { ImagemComponent } from './imagem.component';

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
          <app-imagem-component
            matListItemAvatar
            [fileName]="item._id"
            [queryParameters]="
              item.updatedAt ? { updatedAt: item.updatedAt } : null
            "
          />

          {{ item.nome }}</mat-list-option
        >
        <mat-divider></mat-divider>
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
  imports: [
    AsyncPipe,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    ImagemComponent,
  ],
})
export class SelecaoComedoresComponent {
  private readonly service = inject(ComedoresService);

  loading = computed(() => this.service.loading());

  private readonly _bottomSheetRef = inject(
    MatBottomSheetRef<SelecaoComedoresComponent>,
  );

  private readonly data = inject<{ marmitaId: string }>(MAT_BOTTOM_SHEET_DATA);

  data$: Observable<any[]> = this.service.data$;

  private readonly router = inject(Router);
  comedorTipoSelecao(comedorId: string) {
    this.router.navigate([
      'pedido',
      {
        comedorId: comedorId,
        marmitaId: this.data.marmitaId,
      },
    ]);
    this._bottomSheetRef.dismiss();
  }
}
