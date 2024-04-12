import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, input } from '@angular/core';

@Directive({
  selector: '[grupoPrincipal]',
  standalone: true,
})
export class GrupoPrincipalDirective {
  value = input.required<boolean>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef<HTMLElement>,
  ) {}

  ngOnInit() {
    if (this.value())
      this.el.nativeElement.style.setProperty('border-left', '1px solid red');
    this.el.nativeElement.style.setProperty('padding-left', '5px');
  }
}
