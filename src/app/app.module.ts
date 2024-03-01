import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { NgTemplateOutlet, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComedoresService } from './services/comedores.service';
import { HttpsRequestInterceptor } from './common/requests.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';
import { DEFAULT_TIMEOUT, TOKEN_APP_CONFIG } from './common/tokens';
import { environment } from '../environments/environment';
import { ComedoresComponent } from './pages/comedores/comedores.component';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { IconsProviderUserModule } from './common/icons-provider-user.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent, ComedoresComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgTemplateOutlet,

    IconsProviderUserModule,

    NzListModule,
    NzInputModule,
    NzButtonModule,
    NzToolTipModule,
    NzSkeletonModule,
    NzNotificationModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDrawerModule,
    NzLayoutModule,
    NzMenuModule
  ],
  providers: [
    { provide: TOKEN_APP_CONFIG, useValue: environment },
    { provide: NZ_I18N, useValue: pt_BR },
    ComedoresService,
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
