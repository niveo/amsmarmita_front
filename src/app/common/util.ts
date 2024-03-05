export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const validarFormulario = (validateForm: any) => {
  Object.values(validateForm.controls).forEach((control: any) => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
};
