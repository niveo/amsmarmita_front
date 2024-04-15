import { NgModule } from '@angular/core';

import { AsyncPipe, DatePipe, NgOptimizedImage, NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComedoresComponent } from './comedores.component';
import { ComedoresRoutingModule } from './comedores-routing.module';
import { ComedoresFormComponent } from './comedores-form.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AmsDialogModule } from '@navegador/common/confirmacao-dialog';
import { ContainerCentralComponent } from '@navegador/componentes/container-central.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LongPressDirective } from '@navegador/directives/long-press.directive'; 
import { MatRippleModule } from '@angular/material/core';
import { UploadComponent } from '@navegador/componentes/upload.component';
import { ImagemComponent } from '@navegador/componentes/imagem.component';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';

@NgModule({
  declarations: [ComedoresComponent, ComedoresFormComponent],
  exports: [ComedoresComponent],
  imports: [
    NgStyle,
    AsyncPipe,
    DatePipe,

    ReactiveFormsModule,
    ComedoresRoutingModule,
    AmsDialogModule,
    ContainerCentralComponent,
    LongPressDirective,

    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    NgOptimizedImage,
    MatRippleModule,

    ImagemComponent,
    UploadComponent,
  ],
  providers: [
    {
      provide: TOKEN_PATH_IMAGEKIT,
      useValue: '/amsmarmita/comedores',
    },
  ],
})
export class ComedoresModule {}
