import { Component, inject } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styles: [`
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
    position: relative;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: white;
  }
`]
})
export class LoginComponent {
  quantidadeNumeros: number[] = [];
  selecoes = new Set<number>();
  private readonly service = inject(AuthService);


  constructor() {
    for (let i = 1; i <= 9; i++) {
      this.quantidadeNumeros.push(i);
    }
  }

  selecionar(i: number) {
    this.selecoes.has(i) ? this.selecoes.delete(i) : this.selecoes.add(i);
  }

  selecionado(i: number) {
    return this.selecoes.has(i);
  }

  selecaoContem(i: number) {
    return [...this.selecoes].includes(i)
  }

  limparSelecao() {
    this.selecoes.clear();
  }

  entrar() {
    this.service.login([...this.selecoes].join('')).subscribe({
      error: (response) => {
        console.error(response);
      }
    })
  }
}
