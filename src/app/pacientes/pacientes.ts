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

    if (!this.validarCPF(this.cpf)) {

      this.erro = 'Digite um CPF válido.';

      return;
    }

    const cpfExistente = this.pacientes.some(
      paciente =>
        paciente.cpf.replace(/\D/g, '') ===
        this.cpf.replace(/\D/g, '')
    );

    if (cpfExistente) {

      this.erro = 'Este CPF já está cadastrado.';

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

  validarCPF(cpf: string): boolean {

    const numero = cpf.replace(/\D/g, '');

    if (numero.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(numero)) {
      return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += Number(numero[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    if (resto !== Number(numero[9])) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += Number(numero[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    return resto === Number(numero[10]);
  }

  formatarCPF() {

    let valor = this.cpf.replace(/\D/g, '');

    valor = valor.substring(0, 11);

    if (valor.length > 9) {

      this.cpf =
        valor.substring(0, 3) + '.' +
        valor.substring(3, 6) + '.' +
        valor.substring(6, 9) + '-' +
        valor.substring(9, 11);

    } else if (valor.length > 6) {

      this.cpf =
        valor.substring(0, 3) + '.' +
        valor.substring(3, 6) + '.' +
        valor.substring(6);

    } else if (valor.length > 3) {

      this.cpf =
        valor.substring(0, 3) + '.' +
        valor.substring(3);

    } else {

      this.cpf = valor;

    }

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