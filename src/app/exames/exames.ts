import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Exame {
  id: number;
  paciente: string;
  medico: string;
  tipo: string;
  data: string;
  status: string;
}

@Component({
  selector: 'app-exames',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exames.html',
  styleUrl: './exames.css'
})
export class Exames implements OnInit {

  exames: Exame[] = [];

  novoExame: Exame = {
    id: 0,
    paciente: '',
    medico: '',
    tipo: '',
    data: '',
    status: 'Pendente'
  };

  editando = false;
  mensagem = '';

  ngOnInit(): void {
    this.carregarExames();
  }

  carregarExames(): void {
    const dados = localStorage.getItem('exames');

    if (dados) {
      this.exames = JSON.parse(dados);
    }
  }

  salvarExames(): void {
    localStorage.setItem('exames', JSON.stringify(this.exames));
  }

  cadastrarExame(): void {

    if (
      !this.novoExame.paciente ||
      !this.novoExame.medico ||
      !this.novoExame.tipo ||
      !this.novoExame.data
    ) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    if (this.editando) {

      const indice = this.exames.findIndex(
        exame => exame.id === this.novoExame.id
      );

      if (indice !== -1) {
        this.exames[indice] = { ...this.novoExame };
      }

      this.mensagem = 'Exame atualizado com sucesso!';

    } else {

      this.novoExame.id = Date.now();

      this.exames.push({
        ...this.novoExame
      });

      this.mensagem = 'Exame cadastrado com sucesso!';
    }

    this.salvarExames();
    this.limparFormulario();
  }

  editarExame(exame: Exame): void {
    this.novoExame = { ...exame };
    this.editando = true;
    this.mensagem = '';
  }

  excluirExame(id: number): void {

    const confirmar = confirm(
      'Tem certeza que deseja excluir este exame?'
    );

    if (!confirmar) {
      return;
    }

    this.exames = this.exames.filter(
      exame => exame.id !== id
    );

    this.salvarExames();

    this.mensagem = 'Exame excluído com sucesso!';
  }

  alterarStatus(exame: Exame, status: string): void {

    exame.status = status;

    this.salvarExames();

    this.mensagem = 'Status atualizado com sucesso!';
  }

  limparFormulario(): void {

    this.novoExame = {
      id: 0,
      paciente: '',
      medico: '',
      tipo: '',
      data: '',
      status: 'Pendente'
    };

    this.editando = false;
  }
}