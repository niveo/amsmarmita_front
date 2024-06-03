import { NgModule, LOCALE_ID, Optional, SkipSelf } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { environment } from '../environments/environment';

import { HttpsRequestInterceptor } from './common/requests.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';
import { DEFAULT_TIMEOUT, TOKEN_APP_CONFIG } from './common/tokens';

import localeExtraPT from '@angular/common/locales/extra/pt';
registerLocaleData(pt, 'pt', localeExtraPT);

@NgModule({
  imports: [],
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
