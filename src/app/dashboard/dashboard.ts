import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  nomeUsuario = '';
  tipoUsuario = '';

  pacientes = 0;
  medicos = 0;
  consultasHoje = 0;
  internacoes = 0;
  exames = 0;
  examesPendentes = 0;

  notificacoesAbertas = false;

  leitosTotal = 50;
  leitosOcupados = 0;
  leitosManutencao = 0;

  consultas: any[] = [];
  listaExames: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarDados();
  }

  carregarUsuario(): void {

    const dados = localStorage.getItem('usuarioLogado');

    if (!dados) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = JSON.parse(dados);

    this.nomeUsuario = usuario.nome;
    this.tipoUsuario = usuario.tipo;
  }

  carregarDados(): void {

    const pacientes = localStorage.getItem('pacientes');
    const medicos = localStorage.getItem('medicos');
    const consultas = localStorage.getItem('consultas');
    const internacoes = localStorage.getItem('internacoes');
    const exames = localStorage.getItem('exames');

    this.pacientes = pacientes
      ? JSON.parse(pacientes).length
      : 0;

    this.medicos = medicos
      ? JSON.parse(medicos).length
      : 0;

    if (consultas) {

      this.consultas = JSON.parse(consultas);

      const hoje = new Date()
        .toISOString()
        .split('T')[0];

      this.consultasHoje = this.consultas.filter(
        consulta =>
          consulta.data === hoje &&
          consulta.status !== 'Cancelada'
      ).length;
    }

    if (internacoes) {

      const lista = JSON.parse(internacoes);

      this.internacoes = lista.length;
      this.leitosOcupados = lista.length;
    }

    if (exames) {

      this.listaExames = JSON.parse(exames);

      this.exames = this.listaExames.length;

      this.examesPendentes =
        this.listaExames.filter(
          exame =>
            exame.status === 'Pendente' ||
            exame.status === 'Aguardando resultado'
        ).length;
    }
  }


  get leitosDisponiveis(): number {

    return Math.max(
      0,
      this.leitosTotal -
      this.leitosOcupados -
      this.leitosManutencao
    );
  }


  get ocupacao(): number {

    if (this.leitosTotal === 0) {
      return 0;
    }

    return Math.round(
      (this.leitosOcupados / this.leitosTotal) * 100
    );
  }


  get proximasConsultas(): any[] {

    return this.consultas
      .filter(
        consulta =>
          consulta.status !== 'Cancelada'
      )
      .slice(0, 4);
  }


  get examesRecentes(): any[] {

    return this.listaExames
      .slice(-4)
      .reverse();
  }


  /* NOTIFICAÇÕES */

  abrirNotificacoes(): void {

    this.notificacoesAbertas =
      !this.notificacoesAbertas;

  }


  /* PERMISSÕES */

  podeVerMedicos(): boolean {

    return this.tipoUsuario === 'Administrador';
  }


  podeVerExames(): boolean {

    return (
      this.tipoUsuario === 'Administrador' ||
      this.tipoUsuario === 'Médico'
    );
  }


  podeVerRelatorios(): boolean {

    return (
      this.tipoUsuario === 'Administrador' ||
      this.tipoUsuario === 'Médico'
    );
  }


  podeVerUsuarios(): boolean {

    return this.tipoUsuario === 'Administrador';
  }


  /* NAVEGAÇÃO */

  abrirPacientes(): void {
    this.router.navigate(['/pacientes']);
  }


  abrirMedicos(): void {

    if (!this.podeVerMedicos()) {
      return;
    }

    this.router.navigate(['/medicos']);
  }


  abrirConsultas(): void {
    this.router.navigate(['/consultas']);
  }


  abrirInternacoes(): void {
    this.router.navigate(['/internacoes']);
  }


  abrirExames(): void {

    if (!this.podeVerExames()) {
      return;
    }

    this.router.navigate(['/exames']);
  }


  abrirRelatorios(): void {

    if (!this.podeVerRelatorios()) {
      return;
    }

    this.router.navigate(['/relatorios']);
  }


  abrirUsuarios(): void {

    if (!this.podeVerUsuarios()) {
      return;
    }

    this.router.navigate(['/usuarios']);
  }


  voltarLogin(): void {

    localStorage.removeItem('usuarioLogado');

    this.router.navigate(['/login']);
  }

}