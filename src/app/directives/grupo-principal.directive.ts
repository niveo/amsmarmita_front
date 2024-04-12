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
    const arrow = this.getArrowElement(this.value());
    this.el.nativeElement.insertAdjacentElement('beforebegin', arrow);
  }

  getArrowElement(value: boolean) {
    const arrow = this.document.createElement('span');
    arrow.style.setProperty('display', 'flex');
    arrow.style.setProperty('align-items', 'center');
    arrow.style.setProperty('color', '#004D40');
    arrow.style.setProperty('width', '15px');
    arrow.innerHTML = value ? '¤' : '';
    return arrow;
  }
}
