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

  entrar() {

    this.erro = '';

    if (!this.email || !this.senha) {

      this.erro = 'Preencha o e-mail e a senha.';

      return;
    }

    const usuarioSalvo = localStorage.getItem('usuarioCadastro');

    if (usuarioSalvo) {

      const usuario = JSON.parse(usuarioSalvo);

      if (
        this.email === usuario.email &&
        this.senha === usuario.senha
      ) {

        localStorage.setItem(
          'usuarioLogado',
          JSON.stringify(usuario)
        );

        this.router.navigate(['/dashboard']);

        return;
      }
    }


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


  alternarSenha() {

    this.mostrarSenha = !this.mostrarSenha;

  }


  irParaCadastro() {

    this.router.navigate(['/cadastro']);

  }

}