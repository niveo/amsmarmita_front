import { Validators } from '@angular/forms';

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
