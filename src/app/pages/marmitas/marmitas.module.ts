import { NgModule } from '@angular/core';
import { MarmitasComponent } from './marmitas.component';
import { ComedoresModule } from '../comedores/comedores.module';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MarmitasRoutingModule } from './marmitas-routing.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ContainerCentralComponent } from '@navegador/componentes/container-central.component';
import { ConfirmacaoDialogModule } from '@navegador/common/confirmacao-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarmitasFormComponent } from './marmitas-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { ptBR } from 'date-fns/locale';

@NgModule({
  declarations: [MarmitasComponent, MarmitasFormComponent],
  exports: [],
  imports: [
    AsyncPipe,
    DatePipe,
    ReactiveFormsModule,

    MarmitasRoutingModule,

    MatBottomSheetModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,

    ConfirmacaoDialogModule,
    ContainerCentralComponent,

    //Manter modulo no final para não entrar como rota
    ComedoresModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: ptBR,
    },
    provideDateFnsAdapter(),
  ],
})
export class MarmitasModule {}
