import {
  AsyncPipe,
  DatePipe,
  NgOptimizedImage,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CentralFormComponent } from './componentes/central-form.component';
import { CentralContainerComponent } from './componentes/central-container.component';
import { LongPressDirective } from './directives/long-press.directive';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { ptBR } from 'date-fns/locale';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatListModule,
  MatSnackBarModule,
  MatTabsModule,
  MatChipsModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatBottomSheetModule,
  MatDatepickerModule,
  MatSlideToggleModule,
];

const COMMON_MODULES = [
  NgTemplateOutlet,
  NgStyle,
  AsyncPipe,
  DatePipe,
  FormsModule,
  ReactiveFormsModule,
  NgOptimizedImage,
];

const INTERNAL_MODULES = [
  CentralContainerComponent,
  CentralFormComponent,
  LongPressDirective,
];

const MODULES = [...MATERIAL_MODULES, ...COMMON_MODULES, ...INTERNAL_MODULES];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: ptBR,
    },
    provideDateFnsAdapter(),
  ],
})
export class SharedModule {}
