import { isAfter, parseJSON, format } from 'date-fns';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MSG_ERRO_PROCSSAMENTO } from './constantes';

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const validarFormulario = (validateForm: any) => {
  Object.values(validateForm.controls).forEach((control: any) => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
};

export const getFormValidacoes = (max: number) => [
  Validators.maxLength(max),
  Validators.max(max),
];

export const isEmpty = (value: any) => value === undefined || value === null;

export const isBooleanTransform = (v: boolean | string) =>
  typeof v === 'string' ? v === '' : v;

export const objectToUrl = (value: Object) => {
  let str = '';
  for (let item of Object.keys(value)) {
    str += item + '=' + value[item];
  }
  return str;
};

export const isMarmitaExpirada = (lancamento: any) =>
  isAfter(new Date(), parseJSON(lancamento));

export const msgTextMarmitaExpirada = (lancamento: any) =>
  `Essa marmita fechou dia ${format(parseJSON(lancamento), 'dd/MM/yyyy')}!`;

export const parseErroResponse = (erro) => {
  if (erro instanceof HttpErrorResponse) {
    return erro.error.message;
  } else if (erro instanceof String) {
    return erro;
  }
  return MSG_ERRO_PROCSSAMENTO;
};
