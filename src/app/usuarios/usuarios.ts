import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];

  nome = '';
  email = '';
  senha = '';
  tipo = 'Recepcionista';

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {

    const dados = localStorage.getItem('usuarios');

    if (dados) {
      this.usuarios = JSON.parse(dados);
    }

  }

  cadastrar(): void {

    if (!this.nome || !this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    const usuario = {

      id: Date.now(),

      nome: this.nome,

      email: this.email,

      senha: this.senha,

      tipo: this.tipo

    };

    this.usuarios.push(usuario);

    localStorage.setItem(
      'usuarios',
      JSON.stringify(this.usuarios)
    );

    this.nome = '';
    this.email = '';
    this.senha = '';
    this.tipo = 'Recepcionista';

    alert('Usuário cadastrado com sucesso!');
  }

  excluir(id: number): void {

    const confirmar = confirm(
      'Deseja realmente excluir este usuário?'
    );

    if (!confirmar) {
      return;
    }

    this.usuarios = this.usuarios.filter(
      usuario => usuario.id !== id
    );

    localStorage.setItem(
      'usuarios',
      JSON.stringify(this.usuarios)
    );

  }

}