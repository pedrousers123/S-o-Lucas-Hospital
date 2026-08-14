import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Paciente {
  id: number;
  nome: string;
}

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
}

interface Internacao {
  id: number;
  paciente: string;
  medico: string;
  leito: string;
  dataEntrada: string;
  tipo: string;
  status: string;
}

@Component({
  selector: 'app-internacoes',
  imports: [FormsModule],
  templateUrl: './internacoes.html',
  styleUrl: './internacoes.css'
})
export class Internacoes implements OnInit {

  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  internacoes: Internacao[] = [];

  paciente = '';
  medico = '';
  leito = '';
  dataEntrada = '';
  tipo = '';
  status = 'Internado';

  mensagem = '';
  erro = '';

  tiposInternacao = [
    'Clínica',
    'Cirúrgica',
    'Pediátrica',
    'UTI',
    'Maternidade'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {

    const pacientesSalvos = localStorage.getItem('pacientes');
    const medicosSalvos = localStorage.getItem('medicos');
    const internacoesSalvas = localStorage.getItem('internacoes');

    if (pacientesSalvos) {
      this.pacientes = JSON.parse(pacientesSalvos);
    }

    if (medicosSalvos) {
      this.medicos = JSON.parse(medicosSalvos);
    }

    if (internacoesSalvas) {
      this.internacoes = JSON.parse(internacoesSalvas);
    }

  }

  adicionarInternacao() {

    this.erro = '';
    this.mensagem = '';

    if (
      !this.paciente ||
      !this.medico ||
      !this.leito ||
      !this.dataEntrada ||
      !this.tipo
    ) {

      this.erro = 'Preencha todos os campos.';

      return;
    }

    const leitoOcupado = this.internacoes.some(internacao =>
      internacao.leito === this.leito &&
      internacao.status === 'Internado'
    );

    if (leitoOcupado) {

      this.erro = 'Este leito já está ocupado.';

      return;
    }

    const novaInternacao: Internacao = {

      id: Date.now(),

      paciente: this.paciente,

      medico: this.medico,

      leito: this.leito,

      dataEntrada: this.dataEntrada,

      tipo: this.tipo,

      status: 'Internado'

    };

    this.internacoes.push(novaInternacao);

    this.salvarNoStorage();

    this.mensagem = 'Internação cadastrada com sucesso!';

    this.limparFormulario();

  }

  darAlta(id: number) {

    const internacao = this.internacoes.find(
      item => item.id === id
    );

    if (internacao) {

      internacao.status = 'Alta';

      this.salvarNoStorage();

      this.mensagem = 'Alta registrada com sucesso.';

    }

  }

  excluirInternacao(id: number) {

    const confirmar = confirm(
      'Deseja realmente excluir esta internação?'
    );

    if (!confirmar) {
      return;
    }

    this.internacoes = this.internacoes.filter(
      internacao => internacao.id !== id
    );

    this.salvarNoStorage();

    this.mensagem = 'Internação excluída com sucesso.';

  }

  salvarNoStorage() {

    localStorage.setItem(
      'internacoes',
      JSON.stringify(this.internacoes)
    );

  }

  limparFormulario() {

    this.paciente = '';
    this.medico = '';
    this.leito = '';
    this.dataEntrada = '';
    this.tipo = '';
    this.status = 'Internado';

  }

  voltarDashboard() {

    this.router.navigate(['/dashboard']);

  }

}