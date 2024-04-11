import { Component } from '@angular/core';
import { isMobile } from '../common/util'; 

@Component({
  selector: 'app-footer-component',
  template: `<span>©2024 Implement By AMS</span> `,
  styles: `
    :host {
      padding: 10px;
      text-align: center;
    }
  `,
  standalone: true,
})
export class FooterComponent {
  isMobile = isMobile;
}
