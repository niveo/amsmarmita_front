import { Component } from '@angular/core';
import { isMobile } from '../common/util';
import { VersaoSistemaDirective } from '../directives/versao-sistema.directive';

@Component({
  selector: 'app-footer-component',
  template: ` <div>
    <span>©2024 Implement By AMS</span>
    @if (!isMobile) {
      <span versaosis></span>
    }
  </div>`,
  styles: `
    :host {
      padding: 10px;
      text-align: center;
    }
  `,
  standalone: true,
  imports: [VersaoSistemaDirective],
})
export class FooterComponent {
  isMobile = isMobile;
}
