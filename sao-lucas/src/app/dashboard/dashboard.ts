import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  nomeUsuario = 'Administrador';
  tipoUsuario = 'Administrador';

  pacientes = 0;
  medicos = 0;
  consultasHoje = 0;
  internacoes = 0;

  exames = 0;
  examesPendentes = 0;

  totalLeitos = 50;
  leitosOcupados = 35;
  leitosDisponiveis = 10;
  leitosReservados = 3;
  leitosManutencao = 2;

  porcentagemOcupacao = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarDados();
    this.calcularOcupacao();
  }

  carregarUsuario(): void {

    const dados = localStorage.getItem('usuarioLogado');

    if (dados) {

      const usuario = JSON.parse(dados);

      this.nomeUsuario = usuario.nome;
      this.tipoUsuario = usuario.tipo;

    }

  }

  carregarDados(): void {

    const pacientes = localStorage.getItem('pacientes');
    const medicos = localStorage.getItem('medicos');
    const consultas = localStorage.getItem('consultas');
    const internacoes = localStorage.getItem('internacoes');
    const exames = localStorage.getItem('exames');

    if (pacientes) {
      this.pacientes = JSON.parse(pacientes).length;
    }

    if (medicos) {
      this.medicos = JSON.parse(medicos).length;
    }

    if (consultas) {
      this.consultasHoje = JSON.parse(consultas).length;
    }

    if (internacoes) {
      this.internacoes = JSON.parse(internacoes).length;
    }

    if (exames) {

      const listaExames = JSON.parse(exames);

      this.exames = listaExames.length;

      this.examesPendentes = listaExames.filter(
        (exame: any) => exame.status === 'Pendente'
      ).length;

    }

  }

  calcularOcupacao(): void {

    if (this.totalLeitos > 0) {

      this.porcentagemOcupacao = Math.round(
        (this.leitosOcupados / this.totalLeitos) * 100
      );

    }

  }

  abrirPacientes(): void {
    this.router.navigate(['/pacientes']);
  }

  abrirMedicos(): void {
    this.router.navigate(['/medicos']);
  }

  abrirConsultas(): void {
    this.router.navigate(['/consultas']);
  }

  abrirInternacoes(): void {
    this.router.navigate(['/internacoes']);
  }

  abrirExames(): void {
    this.router.navigate(['/exames']);
  }

  abrirUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }

  abrirConfiguracoes(): void {
    this.router.navigate(['/configuracoes']);
  }

  voltarLogin(): void {

    localStorage.removeItem('usuarioLogado');

    this.router.navigate(['/login']);

  }

}