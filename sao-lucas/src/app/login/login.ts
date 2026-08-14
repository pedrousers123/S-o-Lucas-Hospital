import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  senha = '';

  erro = '';
  mostrarSenha = false;

  constructor(private router: Router) {}

  entrar(): void {

    this.erro = '';

    if (!this.email || !this.senha) {
      this.erro = 'Preencha o e-mail e a senha.';
      return;
    }

    const dados = localStorage.getItem('usuarios');

    const usuarios = dados ? JSON.parse(dados) : [];

    const usuario = usuarios.find(
      (u: any) =>
        u.email === this.email &&
        u.senha === this.senha
    );

    if (usuario) {

      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify(usuario)
      );

      this.router.navigate(['/dashboard']);

      return;
    }

    /*
     * USUÁRIO ADMINISTRADOR PADRÃO
     */

    if (
      this.email === 'admin@saolucas.com' &&
      this.senha === '123456'
    ) {

      const administrador = {
        nome: 'Administrador',
        email: 'admin@saolucas.com',
        tipo: 'Administrador'
      };

      localStorage.setItem(
        'usuarioLogado',
        JSON.stringify(administrador)
      );

      this.router.navigate(['/dashboard']);

      return;
    }

    this.erro = 'E-mail ou senha incorretos.';
  }


  alternarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }


  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

}