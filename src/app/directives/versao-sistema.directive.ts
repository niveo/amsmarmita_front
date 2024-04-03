import { Directive, ElementRef, Inject, Input, inject } from '@angular/core';
import { TOKEN_APP_CONFIG } from '../common/tokens';

@Directive({
  selector: '[versaosis]',
  standalone: true,
})
export class VersaoSistemaDirective {
  private readonly config = inject(TOKEN_APP_CONFIG);
  constructor(private el: ElementRef) {}

  @Input()
  set versaosis(value: any) {
    if (value === 0) {
      this.el.nativeElement.innerText = this.config.versaoSistemaDescricao;
    } else {
      if (value === 1) {
        this.el.nativeElement.innerText = this.config.versaoSistemaVersao;
      }
    }
  }
}
