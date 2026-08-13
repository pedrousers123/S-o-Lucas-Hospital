import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  nome = '';
  email = '';
  senha = '';
  tipo = 'Recepcionista';

  erro = '';
  mensagem = '';

  constructor(private router: Router) {}

  cadastrar() {

    this.erro = '';
    this.mensagem = '';

    if (!this.nome || !this.email || !this.senha) {

      this.erro = 'Preencha todos os campos.';

      return;
    }

    if (this.senha.length < 6) {

      this.erro = 'A senha deve ter pelo menos 6 caracteres.';

      return;
    }

    const usuario = {

      nome: this.nome,

      email: this.email,

      senha: this.senha,

      tipo: this.tipo

    };

    localStorage.setItem(
      'usuarioCadastro',
      JSON.stringify(usuario)
    );

    this.mensagem = 'Conta criada com sucesso!';

    setTimeout(() => {

      this.router.navigate(['/login']);

    }, 1200);
  }

}