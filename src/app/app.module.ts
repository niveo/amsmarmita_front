import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgTemplateOutlet, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderUserModule } from './common/icons-provider-user.module';
import { NzModule } from './common/nz.module';
import { HttpsRequestInterceptor } from './common/requests.interceptor';
import { TimeoutInterceptor } from './common/timeout.interceptor';
import { DEFAULT_TIMEOUT, TOKEN_APP_CONFIG } from './common/tokens';
import { GrupoPrincipalComponent } from './componentes/grupo-principal.component';
import { AmsIconComponent } from './componentes/icon.component';
import { ComedoresComponent } from './pages/comedores/comedores.component';
import { GrupoComponent } from './pages/grupos/grupos.component';
import { MarmitasComedoresComponent } from './pages/marmitas/marmitas-comedores.component';
import { MarmitasComponent } from './pages/marmitas/marmitas.component';
import { PratosFormComposicaoComponent } from './pages/pratos/pratos-form-composicao.component';
import { PratosFormComponent } from './pages/pratos/pratos-form.component';
import { PratoComponent } from './pages/pratos/pratos.component';
import { ComedoresService } from './services/comedores.service';
import { MarmitaService } from './services/marmita.service';
import { LoginComponent } from './pages/login/login.component';
import { VersaoSistemaDirective } from './directives/versao-sistema.directive';
import { SelecaoNumerosComponent } from './componentes/selecao-numeros.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidosAcompanhamentoComponent } from './pages/pedidos/acompanhamento/pedidos-companhamento.component';
import { CorBoardaDirective } from './directives/cor-borda.directive';
import { IngredienteService } from './services/ingrediente.service';
import { IngredienteComponent } from './pages/ingrediente/ingrediente.component';
import { SelecaoIngredientesComponent } from './componentes/selecao-ingredientes.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { RelatorioItemComponent } from './pages/relatorio/relatorio-item.component';
import { RelatorioGeralComponent } from './pages/relatorio/relatorio-geral.component';
import { IngredienteFormComponent } from './pages/ingrediente/ingrediente-form.component';
import { GrupoFormComponent } from './pages/grupos/grupos-form.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ComedoresComponent,
    LoginComponent,
    MarmitasComponent,
    GrupoComponent,
    GrupoFormComponent,
    PratoComponent,
    PratosFormComponent,
    PratosFormComposicaoComponent,
    MarmitasComedoresComponent,
    PedidosComponent,
    PedidosAcompanhamentoComponent,
    IngredienteComponent,
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioGeralComponent,
    IngredienteFormComponent,
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
    NzModule,
    VersaoSistemaDirective,
    SelecaoNumerosComponent,
    CorBoardaDirective,
    SelecaoIngredientesComponent,
  ],
  providers: [
    { provide: TOKEN_APP_CONFIG, useValue: environment },
    { provide: NZ_I18N, useValue: pt_BR },
    ComedoresService,
    MarmitaService,
    IngredienteService,

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
