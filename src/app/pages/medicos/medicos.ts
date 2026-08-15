import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
}

@Component({
  selector: 'app-medicos',
  imports: [FormsModule],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css'
})
export class Medicos implements OnInit {

  medicos: Medico[] = [];

  nome = '';
  especialidade = '';
  crm = '';

  especialidades = [
    'Cardiologia',
    'Clínica Geral',
    'Dermatologia',
    'Ginecologia',
    'Neurologia',
    'Ortopedia',
    'Pediatria',
    'Psiquiatria',
    'Oftalmologia',
    'Urologia'
  ];

  mensagem = '';
  erro = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarMedicos();
  }

  carregarMedicos() {
    const dados = localStorage.getItem('medicos');

    if (dados) {
      this.medicos = JSON.parse(dados);
    }
  }

  adicionarMedico() {

    this.erro = '';
    this.mensagem = '';

    if (!this.nome || !this.especialidade || !this.crm) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    const novoMedico: Medico = {
      id: Date.now(),
      nome: this.nome,
      especialidade: this.especialidade,
      crm: this.crm
    };

    this.medicos.push(novoMedico);

    localStorage.setItem(
      'medicos',
      JSON.stringify(this.medicos)
    );

    this.mensagem = 'Médico cadastrado com sucesso!';

    this.nome = '';
    this.especialidade = '';
    this.crm = '';
  }

  excluirMedico(id: number) {

    const confirmar = confirm(
      'Deseja realmente excluir este médico?'
    );

    if (!confirmar) {
      return;
    }

    this.medicos = this.medicos.filter(
      medico => medico.id !== id
    );

    localStorage.setItem(
      'medicos',
      JSON.stringify(this.medicos)
    );

    this.mensagem = 'Médico excluído com sucesso.';
  }

  voltarDashboard() {
    this.router.navigate(['/dashboard']);
  }
}