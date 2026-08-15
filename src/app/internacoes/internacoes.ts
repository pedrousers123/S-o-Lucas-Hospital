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

  mensagem = '';
  erro = '';

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

    this.mensagem = '';
    this.erro = '';

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

    this.mensagem = '';
    this.erro = '';

  }


  adicionarInternacao(): void {

    this.mensagem = '';
    this.erro = '';


    // VALIDAÇÃO DOS CAMPOS

    if (
      !this.novaInternacao.paciente ||
      !this.novaInternacao.quarto ||
      !this.novaInternacao.leito ||
      !this.novaInternacao.medico ||
      !this.novaInternacao.entrada
    ) {

      this.erro =
        'Preencha todos os campos obrigatórios.';

      return;
    }


    // VERIFICA SE O PACIENTE JÁ ESTÁ INTERNADO

    const pacienteInternado =
      this.internacoes.some(
        internacao =>
          internacao.paciente.toLowerCase() ===
          this.novaInternacao.paciente
            .toLowerCase()
      );

    if (pacienteInternado) {

      this.erro =
        'Este paciente já possui uma internação ativa.';

      return;
    }


    // VERIFICA SE O LEITO ESTÁ OCUPADO

    const leitoOcupado =
      this.internacoes.some(
        internacao =>
          internacao.quarto ===
            this.novaInternacao.quarto &&
          internacao.leito ===
            this.novaInternacao.leito
      );

    if (leitoOcupado) {

      this.erro =
        'Este leito já está ocupado por outro paciente.';

      return;
    }


    // CRIA A INTERNAÇÃO

    const nova: Internacao = {

      ...this.novaInternacao,

      id: Date.now()

    };


    this.internacoes.push(nova);

    this.salvarInternacoes();

    this.mensagem =
      'Internação cadastrada com sucesso!';

    this.limparFormulario();

    this.mostrarFormulario = false;

  }


  darAlta(id: number): void {

    const confirmar = confirm(
      'Deseja realmente dar alta para este paciente?'
    );

    if (!confirmar) {
      return;
    }


    this.internacoes =
      this.internacoes.filter(
        internacao =>
          internacao.id !== id
      );


    this.salvarInternacoes();

    this.mensagem =
      'Alta realizada com sucesso. O leito está disponível novamente.';

    this.erro = '';

  }


  alterarStatus(
    internacao: Internacao,
    status: string
  ): void {

    internacao.status = status;

    this.salvarInternacoes();

    this.mensagem =
      'Status da internação atualizado.';

    this.erro = '';

  }


  limparFormulario(): void {

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


  get totalInternacoes(): number {

    return this.internacoes.length;

  }


  get estaveis(): number {

    return this.internacoes.filter(
      item =>
        item.status === 'Estável'
    ).length;

  }


  get observacao(): number {

    return this.internacoes.filter(
      item =>
        item.status === 'Em observação'
    ).length;

  }


  get criticos(): number {

    return this.internacoes.filter(
      item =>
        item.status === 'Crítico'
    ).length;

  }

}