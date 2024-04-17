import { Component, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'central-form',
  templateUrl: './central-form.component.html',
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    MatIconModule,
    MatButtonModule
  ]
})
export class CentralFormComponent {
  form = input.required<FormGroup>();
  close = output<void>();
  save = output<void>();
  loading = input(false);
}
