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

  mensagem = '';
  erro = '';

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

  adicionarConsulta() {

    this.erro = '';
    this.mensagem = '';

    if (!this.paciente || !this.medico || !this.data || !this.horario) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    const consultaExistente = this.consultas.some(consulta =>
      consulta.medico === this.medico &&
      consulta.data === this.data &&
      consulta.horario === this.horario
    );

    if (consultaExistente) {
      this.erro = 'Este médico já possui uma consulta neste horário.';
      return;
    }

    const novaConsulta: Consulta = {
      id: Date.now(),
      paciente: this.paciente,
      medico: this.medico,
      data: this.data,
      horario: this.horario
    };

    this.consultas.push(novaConsulta);

    localStorage.setItem(
      'consultas',
      JSON.stringify(this.consultas)
    );

    this.mensagem = 'Consulta agendada com sucesso!';

    this.paciente = '';
    this.medico = '';
    this.data = '';
    this.horario = '';
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

    localStorage.setItem(
      'consultas',
      JSON.stringify(this.consultas)
    );

    this.mensagem = 'Consulta excluída com sucesso.';
  }

  voltarDashboard() {
    this.router.navigate(['/dashboard']);
  }
}