import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { HttpsRequestInterceptor } from './common/requests.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';
import { DEFAULT_TIMEOUT, TOKEN_APP_CONFIG } from './common/tokens';

import localeExtraPT from '@angular/common/locales/extra/pt';
registerLocaleData(pt, 'pt', localeExtraPT);

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: TOKEN_APP_CONFIG, useValue: environment },

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
