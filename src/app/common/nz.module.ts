import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const COMPONENTES = [
  NzListModule,
  NzInputModule,
  NzButtonModule,
  NzToolTipModule,
  NzSkeletonModule,
  NzNotificationModule,
  NzMessageModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzLayoutModule,
  NzMenuModule,
  NzDatePickerModule,
  NzCardModule,
  NzModalModule,
  NzGridModule,
  NzDropDownModule,
  NzSwitchModule,
  NzCollapseModule,
  NzBadgeModule,
  NzFormModule,
  NzSelectModule,
  NzTagModule,
  NzPopoverModule,
  NzRadioModule,
  NzFlexModule,
  NzTabsModule,
  NzCheckboxModule
];

@NgModule({
  declarations: [],
  imports: [...COMPONENTES],
  exports: [...COMPONENTES],
  providers: [],
})
export class NzModule {}
