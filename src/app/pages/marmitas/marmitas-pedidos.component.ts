import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ComedoresService } from '../../services/comedores.service';

@Component({
  selector: 'app-marmitas-pedidos-component',
  templateUrl: './marmitas-pedidos.component.html',
})
export class MarmitasPedidosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly comedoresService = inject(ComedoresService);

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        mergeMap(({ comedorId, marmitaId }) => {
          return this.comedoresService.getId(comedorId);
        }),
      )
      .subscribe(console.log);
  }

  visible = false;
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
