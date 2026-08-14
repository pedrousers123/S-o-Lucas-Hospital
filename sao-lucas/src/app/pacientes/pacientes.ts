import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  nascimento: string;
  convenio: string;
}

@Component({
  selector: 'app-pacientes',
  imports: [FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css'
})
export class Pacientes implements OnInit {

  pacientes: Paciente[] = [];

  nome = '';
  cpf = '';
  telefone = '';
  nascimento = '';
  convenio = '';

  busca = '';

  mostrarFormulario = false;

  mensagem = '';
  erro = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarPacientes();
  }

  carregarPacientes() {

    const dados = localStorage.getItem('pacientes');

    if (dados) {
      this.pacientes = JSON.parse(dados);
    }

  }

  salvarPaciente() {

    this.erro = '';
    this.mensagem = '';

    if (
      !this.nome ||
      !this.cpf ||
      !this.telefone ||
      !this.nascimento
    ) {

      this.erro = 'Preencha todos os campos obrigatórios.';

      return;
    }

    const novoPaciente: Paciente = {

      id: Date.now(),

      nome: this.nome,

      cpf: this.cpf,

      telefone: this.telefone,

      nascimento: this.nascimento,

      convenio: this.convenio || 'Particular'

    };

    this.pacientes.push(novoPaciente);

    this.salvarNoStorage();

    this.mensagem = 'Paciente cadastrado com sucesso!';

    this.limparFormulario();

    this.mostrarFormulario = false;

  }

  excluirPaciente(id: number) {

    const confirmar = confirm(
      'Deseja realmente excluir este paciente?'
    );

    if (!confirmar) {
      return;
    }

    this.pacientes = this.pacientes.filter(
      paciente => paciente.id !== id
    );

    this.salvarNoStorage();

    this.mensagem = 'Paciente excluído com sucesso.';

  }

  salvarNoStorage() {

    localStorage.setItem(
      'pacientes',
      JSON.stringify(this.pacientes)
    );

  }

  limparFormulario() {

    this.nome = '';
    this.cpf = '';
    this.telefone = '';
    this.nascimento = '';
    this.convenio = '';

  }

  abrirFormulario() {

    this.erro = '';
    this.mensagem = '';

    this.limparFormulario();

    this.mostrarFormulario = true;

  }

  fecharFormulario() {

    this.mostrarFormulario = false;

    this.erro = '';

  }

  voltarDashboard() {

    this.router.navigate(['/dashboard']);

  }

  pacientesFiltrados(): Paciente[] {

    if (!this.busca.trim()) {
      return this.pacientes;
    }

    const termo = this.busca.toLowerCase();

    return this.pacientes.filter(paciente =>
      paciente.nome.toLowerCase().includes(termo) ||
      paciente.cpf.includes(termo)
    );

  }

}