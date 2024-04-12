import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
@Directive({
  selector: '[longPress]',
  standalone: true,
})
export class LongPressDirective {
  private touchTimeout: any;
  @Output() longPress = new EventEmitter();

  constructor() {}

  @HostListener('touchstart') touchstart(): void {
    this.touchTimeout = setTimeout(() => {
      this.longPress.emit({});
    }, 400);
  }

  @HostListener('touchend') touchend(): void {
    this.touchEnd();
  }
  @HostListener('touchcancel') touchcancel(): void {
    this.touchEnd();
  }

  private touchEnd(): void {
    clearTimeout(this.touchTimeout);
  }
}
