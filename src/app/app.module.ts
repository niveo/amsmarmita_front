import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { NgTemplateOutlet, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComedoresService } from './services/comedores.service';
import { HttpsRequestInterceptor } from './common/requests.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';
import { DEFAULT_TIMEOUT, TOKEN_APP_CONFIG } from './common/tokens';
import { environment } from '../environments/environment';
import { ComedoresComponent } from './pages/comedores/comedores.component';

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

import { IconsProviderUserModule } from './common/icons-provider-user.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';
import { MarmitaService } from './services/marmita.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AmsIconComponent } from './componentes/icon.component';
import { GrupoService } from './services/grupo.service';
import { GrupoComponent } from './pages/grupos/grupos.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { PratoService } from './services/prato.service';
import { PratoComponent } from './pages/pratos/pratos.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PratosFormComponent } from './pages/pratos/pratos-form.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PratosFormComposicaoComponent } from './pages/pratos/pratos-form-composicao.component';
import { GrupoPrincipalComponent } from './componentes/grupo-principal.component';
import { MarmitasComedoresComponent } from './pages/marmitas/marmitas-comedores.component';
import { MarmitasPedidosComponent } from './pages/marmitas/marmitas-pedidos.component';
import { Title } from '@angular/platform-browser';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PratoStore } from './stores/prato.store';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ComedoresComponent,
    MarmitasComponent,
    GrupoComponent,
    PratoComponent,
    PratosFormComponent,
    PratosFormComposicaoComponent,
    MarmitasComedoresComponent,
    MarmitasPedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgTemplateOutlet,
    AmsIconComponent,
    GrupoPrincipalComponent,

    IconsProviderUserModule,

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
    NzPopoverModule
  ],
  providers: [
    { provide: TOKEN_APP_CONFIG, useValue: environment },
    { provide: NZ_I18N, useValue: pt_BR },
    ComedoresService,
    MarmitaService,
    GrupoService,
 
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private titleService: Title) {
    this.titleService.setTitle(environment.titulo);
  }
}
