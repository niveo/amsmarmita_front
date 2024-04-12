import { InjectionToken } from '@angular/core';
import { BaseService } from '@navegador/services/base.service';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

export const TOKEN_APP_CONFIG = new InjectionToken<{
  titulo: string;
  production: boolean;
  apiUri: string;
  versaoSistemaVersao: string;
  versaoSistemaCodigo: number;
  versaoSistemaDescricao: string;
}>('Application config');

export const SERVICO_GENERICO_TOKEN = new InjectionToken<BaseService>(
  'SERVICO_GENERICO_TOKEN',
);
