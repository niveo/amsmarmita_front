import { Component, Input, input } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-grupo-principal-component',
  template: ` <nz-badge
    [nzColor]="principal() ? cor() : '#d9d9d9'"
  ></nz-badge>`,
  standalone: true,
  imports: [NzBadgeModule],
})
export class GrupoPrincipalComponent {
  principal = input.required<boolean>();
  cor = input<string>('green');
}
