import { Component, Signal, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'amslib';

@Component({
  selector: '',
  template: ``,
})
export abstract class BaseFormComponent<T> {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly _messageService = inject(NotificationService);

  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  data = input.required<T>();

  abstract form: FormGroup;
  abstract loading: Signal<boolean>;
}
