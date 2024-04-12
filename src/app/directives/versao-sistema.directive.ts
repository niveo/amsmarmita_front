import { Directive, ElementRef, inject } from '@angular/core';
import { TOKEN_APP_CONFIG } from '../common/tokens';

@Directive({
  selector: '[versaosis]',
  standalone: true,
})
export class VersaoSistemaDirective {
  private readonly config = inject(TOKEN_APP_CONFIG);
  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.style.setProperty('font-size', '10px');
    this.el.nativeElement.style.setProperty('color', 'gray');
    this.el.nativeElement.innerText = this.config.versaoSistemaDescricao;
  }
}
