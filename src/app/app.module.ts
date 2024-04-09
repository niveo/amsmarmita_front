import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgTemplateOutlet, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderUserModule } from './common/icons-provider-user.module';
import { LoginComponent } from './pages/login/login.component';
import { VersaoSistemaDirective } from './directives/versao-sistema.directive';
import { CoreModule } from './core.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    VersaoSistemaDirective,

    NzDrawerModule,
    NzButtonModule,
    NzMenuModule,
    NzLayoutModule,
    NgTemplateOutlet,

    IconsProviderUserModule,

    MatSnackBarModule,

    CoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync()],
})
export class AppModule {
  constructor(private titleService: Title) {
    this.titleService.setTitle(environment.titulo);
  }
}
