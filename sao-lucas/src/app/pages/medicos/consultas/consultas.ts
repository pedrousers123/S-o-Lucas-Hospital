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

interface Consulta {
  id: number;
  paciente: string;
  medico: string;
  data: string;
  horario: string;
  tipo: string;
  observacoes: string;
  status: string;
}

@Component({
  selector: 'app-consultas',
  imports: [FormsModule],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css'
})
export class Consultas implements OnInit {

  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  consultas: Consulta[] = [];

  paciente = '';
  medico = '';
  data = '';
  horario = '';
  tipo = '';
  observacoes = '';
  status = 'Agendada';

  mensagem = '';
  erro = '';

  editando = false;
  idEditando = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {

    const pacientesSalvos = localStorage.getItem('pacientes');
    const medicosSalvos = localStorage.getItem('medicos');
    const consultasSalvas = localStorage.getItem('consultas');

    if (pacientesSalvos) {
      this.pacientes = JSON.parse(pacientesSalvos);
    }

    if (medicosSalvos) {
      this.medicos = JSON.parse(medicosSalvos);
    }

    if (consultasSalvas) {
      this.consultas = JSON.parse(consultasSalvas);
    }
  }

  salvarConsultas() {

    localStorage.setItem(
      'consultas',
      JSON.stringify(this.consultas)
    );
  }

  contarPorStatus(status: string): number {

    return this.consultas.filter(
      consulta => consulta.status === status
    ).length;

  }

  adicionarConsulta() {

    this.erro = '';
    this.mensagem = '';

    if (
      !this.paciente ||
      !this.medico ||
      !this.data ||
      !this.horario ||
      !this.tipo
    ) {

      this.erro = 'Preencha todos os campos obrigatórios.';

      return;
    }

    const consultaExistente = this.consultas.some(consulta =>

      consulta.medico === this.medico &&
      consulta.data === this.data &&
      consulta.horario === this.horario &&
      consulta.id !== this.idEditando &&
      consulta.status !== 'Cancelada'

    );

    if (consultaExistente) {

      this.erro =
        'Este médico já possui uma consulta neste dia e horário.';

      return;
    }

    if (this.editando) {

      const consulta = this.consultas.find(
        item => item.id === this.idEditando
      );

      if (consulta) {

        consulta.paciente = this.paciente;
        consulta.medico = this.medico;
        consulta.data = this.data;
        consulta.horario = this.horario;
        consulta.tipo = this.tipo;
        consulta.observacoes = this.observacoes;
        consulta.status = this.status;

        this.salvarConsultas();

        this.mensagem = 'Consulta atualizada com sucesso.';

        this.cancelarEdicao();
      }

      return;
    }

    const novaConsulta: Consulta = {

      id: Date.now(),

      paciente: this.paciente,

      medico: this.medico,

      data: this.data,

      horario: this.horario,

      tipo: this.tipo,

      observacoes: this.observacoes,

      status: 'Agendada'

    };

    this.consultas.push(novaConsulta);

    this.salvarConsultas();

    this.mensagem = 'Consulta agendada com sucesso.';

    this.limparFormulario();
  }

  editarConsulta(consulta: Consulta) {

    this.editando = true;

    this.idEditando = consulta.id;

    this.paciente = consulta.paciente;
    this.medico = consulta.medico;
    this.data = consulta.data;
    this.horario = consulta.horario;
    this.tipo = consulta.tipo;
    this.observacoes = consulta.observacoes;
    this.status = consulta.status;

    this.mensagem = '';
    this.erro = '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  cancelarEdicao() {

    this.editando = false;

    this.idEditando = 0;

    this.limparFormulario();
  }

  alterarStatus(
    consulta: Consulta,
    novoStatus: string
  ) {

    consulta.status = novoStatus;

    this.salvarConsultas();

    this.mensagem =
      'Status da consulta atualizado.';

    this.erro = '';
  }

  excluirConsulta(id: number) {

    const confirmar = confirm(
      'Deseja realmente excluir esta consulta?'
    );

    if (!confirmar) {
      return;
    }

    this.consultas = this.consultas.filter(
      consulta => consulta.id !== id
    );

    this.salvarConsultas();

    this.mensagem =
      'Consulta excluída com sucesso.';

    this.erro = '';
  }

  limparFormulario() {

    this.paciente = '';
    this.medico = '';
    this.data = '';
    this.horario = '';
    this.tipo = '';
    this.observacoes = '';
    this.status = 'Agendada';

    this.editando = false;
    this.idEditando = 0;
  }

  voltarDashboard() {

    this.router.navigate(['/dashboard']);

  }

}