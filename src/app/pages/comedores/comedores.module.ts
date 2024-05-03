import { NgModule } from '@angular/core';
import { ComedoresComponent } from './comedores.component';
import { ComedoresRoutingModule } from './comedores-routing.module';
import { ComedoresFormComponent } from './comedores-form.component';
import { UploadComponent } from '@navegador/componentes/upload.component';
import { ImagemComponent } from '@navegador/componentes/imagem.component';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';
import { SharedModule } from '@navegador/shared.module';

@NgModule({
  declarations: [ComedoresComponent, ComedoresFormComponent],
  exports: [ComedoresComponent],
  imports: [
    ComedoresRoutingModule,

    SharedModule,

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
