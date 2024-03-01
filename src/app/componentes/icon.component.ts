import { Component, Input, booleanAttribute } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'
  | Array<string>;

@Component({
  selector: 'app-icon',
  template: ` <span
    class="anticon material-symbols-outlined"
    [style.color]="nzDanger ? '#F44336' : 'none'"
    style="font-size: 16px;"
    nz-tooltip
    [nzTooltipTitle]="nzTooltipTitle"
    [nzTooltipPlacement]="nzTooltipPlacement"
  >
    <ng-content></ng-content>
  </span>`,
  standalone: true,
  imports: [NzToolTipModule],
})
export class AmsIconComponent {
  @Input()
  nzTooltipTitle?: string;

  @Input({ transform: booleanAttribute })
  nzDanger = false;

  @Input()
  nzTooltipPlacement?: TooltipPlacement;
}
