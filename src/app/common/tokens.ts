import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

export const TOKEN_APP_CONFIG = new InjectionToken<{
  titulo: string;
  production: boolean;
  apiUri: string;
  versaoSistemaVersao: string;
  versaoSistemaCodigo: number;
  versaoSistemaDescricao: string;
}>('Application config');

export const TOKEN_PATH_IMAGEKIT = new InjectionToken<string>(
  'url path image kit endpoint',
  {
    providedIn: 'root',
    factory: () => environment.imageKitUrlEndpoint,
  },
);

export const TOKEN_PATH_IMAGEKIT_END_POINT = new InjectionToken<string>(
  'url path image kit endpoint',
  {
    providedIn: 'root',
    factory: () => environment.imageKitUrlEndpoint,
  },
);

