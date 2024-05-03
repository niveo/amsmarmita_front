import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { VersaoSistemaDirective } from './directives/versao-sistema.directive';
import { CoreModule } from './core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './componentes/footer.component';
import { provideImageKitLoader } from '@angular/common';
import { ImagekitioAngularModule } from 'imagekit-angular';
import { AppRoutingModule } from './app-routing';
import { SharedModule } from './shared.module';

import pt from '@angular/common/locales/pt';
registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    VersaoSistemaDirective,

    LoginComponent,
    FooterComponent,

    MatToolbarModule,

    SharedModule,
    CoreModule,

    ImagekitioAngularModule.forRoot({
      publicKey: environment.imageKitPublicKey,
      urlEndpoint: environment.imageKitUrlEndpoint,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    provideImageKitLoader(environment.imageKitUrlEndpoint),
  ],
})
export class AppModule {
  constructor(private titleService: Title) {
    this.titleService.setTitle(environment.titulo);
  }
}
