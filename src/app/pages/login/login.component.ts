import { Component, inject } from '@angular/core';
import { AuthService } from '@navegador/auth/auth.service';
import { finalize } from 'rxjs';
import { isMobile } from '@navegador/common/util';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VersaoSistemaDirective } from '@navegador/directives/versao-sistema.directive';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  standalone: true,
  styles: [
    `
      .content {
        justify-content: center;
        padding: 10px;
        display: grid;
        grid-template-columns: 80px 80px 80px;
        gap: 10px;
      }

      .box0 {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 0;
      }

      .box1 {
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 0;
      }

      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .mat-mdc-button > .mat-icon {
        margin-right: 0px;
        margin-left: 0px;
      }
    `,
  ],
  imports: [MatButtonModule, MatIconModule, VersaoSistemaDirective],
})
export class LoginComponent {
  private readonly service = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);

  quantidadeNumeros: number[] = [];
  selecoes = new Set<number>();
  selecao: any = {};

  loading = false;
  isMobile = isMobile;

  constructor() {
    for (let i = 1; i <= 9; i++) {
      this.quantidadeNumeros.push(i);
    }
  }

  selecionar(i: number) {
    this.selecoes.has(i) ? this.selecoes.delete(i) : this.selecoes.add(i);
    if (this.selecao[i]) delete this.selecao[i];
    else this.selecao[i] = i;
  }

  limparSelecao() {
    this.selecoes.clear();
    this.selecao = {};
  }

  entrar() {
    this.loading = true;
    this.service
      .login([...this.selecoes].join(''))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        error: (response) => {
          console.error(response);
          this._snackBar.open('Senha invalida!', 'OK', {
            duration: 500
          });
        },
      });
  }
}
