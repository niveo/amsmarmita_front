import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

export const TOKEN_APP_CONFIG = new InjectionToken<{
  production: boolean;
  apiUri: string;
  versaoSistemaVersao: string;
  versaoSistemaCodigo: number;
  versaoSistemaDescricao: string;
}>('Application config');
