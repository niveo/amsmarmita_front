import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';
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
    [style.color]="nzDanger ? '#F44336' : 'none'"
    style="font-size: 16px;"
    nz-tooltip
    [nzTooltipTitle]="nzTooltipTitle"
    [nzTooltipPlacement]="nzTooltipPlacement"
  >
    <ng-content></ng-content>
  </span>`,
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [NzToolTipModule],
})
export class AmsIconComponent {
  @HostBinding('class')
  classHost = 'anticon material-symbols-outlined';

  @Input()
  nzTooltipTitle?: string;

  @Input({ transform: booleanAttribute })
  nzDanger = false;

  @Input()
  nzTooltipPlacement?: TooltipPlacement;
}
