import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgTemplateOutlet, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { VersaoSistemaDirective } from './directives/versao-sistema.directive';
import { CoreModule } from './core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { FooterComponent } from './componentes/footer.component';
import { MatListModule } from '@angular/material/list';
import { provideImageKitLoader } from '@angular/common';
import { ImagekitioAngularModule } from 'imagekit-angular';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    VersaoSistemaDirective,

    NgTemplateOutlet,

    MatSnackBarModule,

    LoginComponent,
    FooterComponent,

    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,

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
