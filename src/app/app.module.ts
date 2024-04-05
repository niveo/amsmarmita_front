import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgTemplateOutlet, registerLocaleData } from '@angular/common';

import pt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderUserModule } from './common/icons-provider-user.module';
import { NzModule } from './common/nz.module';
import { GrupoPrincipalComponent } from './componentes/grupo-principal.component';
import { AmsIconComponent } from './componentes/icon.component';
import { ComedoresComponent } from './pages/comedores/comedores.component';
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
import { SelecaoIngredientesComponent } from './componentes/selecao-ingredientes.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { RelatorioItemComponent } from './pages/relatorio/relatorio-item.component';
import { RelatorioGeralComponent } from './pages/relatorio/relatorio-geral.component';
import { CoreModule } from './core.module';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ComedoresComponent,
    LoginComponent,
    MarmitasComponent,
    PratoComponent,
    PratosFormComponent,
    PratosFormComposicaoComponent,
    MarmitasComedoresComponent,
    PedidosComponent,
    PedidosAcompanhamentoComponent,
    RelatorioComponent,
    RelatorioItemComponent,
    RelatorioGeralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
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
    CoreModule,
  ],
  providers: [ComedoresService, MarmitaService, IngredienteService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private titleService: Title) {
    this.titleService.setTitle(environment.titulo);
  }
}
