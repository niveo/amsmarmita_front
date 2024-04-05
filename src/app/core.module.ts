import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';

import { HttpsRequestInterceptor } from './common/requests.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';
import { DEFAULT_TIMEOUT, TOKEN_APP_CONFIG } from './common/tokens';

registerLocaleData(pt);

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    { provide: TOKEN_APP_CONFIG, useValue: environment },
    { provide: NZ_I18N, useValue: pt_BR },

    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  ],
})
export class CoreModule {}
