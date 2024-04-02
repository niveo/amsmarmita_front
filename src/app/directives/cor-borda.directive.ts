import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[corBoarda]',
  standalone: true,
})
export class CorBoardaDirective {
  constructor(private el: ElementRef) {}


  @Input()
  set corBoarda(value: any) { 
    this.el.nativeElement.style['border-left'] = '4px solid '+ (value || '#EEEEEE');
  }
}
