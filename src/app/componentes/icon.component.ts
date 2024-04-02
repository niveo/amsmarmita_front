import {
  Component,
  HostBinding,
  Input,
  NgModule,
  booleanAttribute,
  input,
} from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { isBooleanTransform } from '../common/util';

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
    [style.color]="nzDanger() ? '#F44336' : 'none'"
    style="font-size: 16px;"
    nz-tooltip
    [nzTooltipTitle]="nzTooltipTitle()"
    [nzTooltipPlacement]="nzTooltipPlacement()"
  >
    <ng-content></ng-content>
  </span>`,
  standalone: true,
  imports: [NzToolTipModule],
})
export class AmsIconComponent {
  @HostBinding('class')
  classHost = 'anticon material-symbols-outlined';

  nzTooltipTitle = input<string>();

  nzDanger = input(false, {
    transform: isBooleanTransform,
  });

  nzTooltipPlacement = input<TooltipPlacement>();
}
