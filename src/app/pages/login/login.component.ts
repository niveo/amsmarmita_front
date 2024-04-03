import { Component, inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/auth.service';
import { LBL_ERRO } from '../../common/constantes';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
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
        margin: auto;
        //position: relative;
        top: 100px;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: white;
      }
    `,
  ],
})
export class LoginComponent {
  quantidadeNumeros: number[] = [];
  selecoes = new Set<number>();
  selecao: any = {};
  private readonly service = inject(AuthService);
  private readonly notify = inject(NzNotificationService);
  loading = false;

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
    this.service.login([...this.selecoes].join('')).subscribe({
      error: (response) => {
        console.error(response);
        this.notify.error(LBL_ERRO, 'Senha invalida!');
      },
    });
  }
}
