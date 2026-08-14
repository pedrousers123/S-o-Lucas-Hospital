import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Internacao {
  id: number;
  paciente: string;
  quarto: string;
  leito: string;
  medico: string;
  entrada: string;
  previsaoAlta: string;
  status: string;
}

@Component({
  selector: 'app-internacoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './internacoes.html',
  styleUrl: './internacoes.css'
})
export class Internacoes implements OnInit {

  internacoes: Internacao[] = [];

  mostrarFormulario = false;

  novaInternacao: Internacao = {
    id: 0,
    paciente: '',
    quarto: '',
    leito: '',
    medico: '',
    entrada: '',
    previsaoAlta: '',
    status: 'Estável'
  };

  ngOnInit(): void {
    this.carregarInternacoes();
  }

  carregarInternacoes(): void {
    const dados = localStorage.getItem('internacoes');

    if (dados) {
      this.internacoes = JSON.parse(dados);
    }
  }

  salvarInternacoes(): void {
    localStorage.setItem(
      'internacoes',
      JSON.stringify(this.internacoes)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;

    this.novaInternacao = {
      id: 0,
      paciente: '',
      quarto: '',
      leito: '',
      medico: '',
      entrada: '',
      previsaoAlta: '',
      status: 'Estável'
    };
  }

  fecharFormulario(): void {
    this.mostrarFormulario = false;
  }

  adicionarInternacao(): void {

    if (
      !this.novaInternacao.paciente ||
      !this.novaInternacao.quarto ||
      !this.novaInternacao.leito ||
      !this.novaInternacao.medico ||
      !this.novaInternacao.entrada
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const nova: Internacao = {
      ...this.novaInternacao,
      id: Date.now()
    };

    this.internacoes.push(nova);

    this.salvarInternacoes();

    this.fecharFormulario();
  }

  darAlta(id: number): void {

    const confirmar = confirm(
      'Deseja realmente dar alta para este paciente?'
    );

    if (!confirmar) {
      return;
    }

    this.internacoes = this.internacoes.filter(
      internacao => internacao.id !== id
    );

    this.salvarInternacoes();
  }

  alterarStatus(internacao: Internacao, status: string): void {
    internacao.status = status;
    this.salvarInternacoes();
  }

  get totalInternacoes(): number {
    return this.internacoes.length;
  }

  get estaveis(): number {
    return this.internacoes.filter(
      item => item.status === 'Estável'
    ).length;
  }

  get observacao(): number {
    return this.internacoes.filter(
      item => item.status === 'Em observação'
    ).length;
  }

  get criticos(): number {
    return this.internacoes.filter(
      item => item.status === 'Crítico'
    ).length;
  }
}