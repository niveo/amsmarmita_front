import { Directive, ElementRef, Inject, Input, inject } from '@angular/core';
import { TOKEN_APP_CONFIG } from '../common/tokens';
import { isMobile } from '../common/util';

@Directive({
  selector: '[versaosis]',
  standalone: true,
})
export class VersaoSistemaDirective {
  private readonly config = inject(TOKEN_APP_CONFIG);
  isMobile = isMobile;
  constructor(private el: ElementRef) {
    this.el.nativeElement.innerText = this.config.versaoSistemaDescricao;
  }
}
