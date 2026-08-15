import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css'
})
export class Relatorios implements OnInit {

  pacientes = 0;
  medicos = 0;
  consultas = 0;
  agendadas = 0;
  realizadas = 0;
  canceladas = 0;

  internacoes = 0;
  estaveis = 0;
  observacao = 0;
  criticos = 0;

  exames = 0;
  examesPendentes = 0;

  leitosTotal = 100;
  leitosOcupados = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {

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

      const lista = JSON.parse(consultas);

      this.consultas = lista.length;

      this.agendadas = lista.filter(
        (item: any) => item.status === 'Agendada'
      ).length;

      this.realizadas = lista.filter(
        (item: any) => item.status === 'Realizada'
      ).length;

      this.canceladas = lista.filter(
        (item: any) => item.status === 'Cancelada'
      ).length;
    }


    if (internacoes) {

      const lista = JSON.parse(internacoes);

      this.internacoes = lista.length;
      this.leitosOcupados = lista.length;

      this.estaveis = lista.filter(
        (item: any) => item.status === 'Estável'
      ).length;

      this.observacao = lista.filter(
        (item: any) => item.status === 'Em observação'
      ).length;

      this.criticos = lista.filter(
        (item: any) => item.status === 'Crítico'
      ).length;
    }


    if (exames) {

      const lista = JSON.parse(exames);

      this.exames = lista.length;

      this.examesPendentes = lista.filter(
        (item: any) => item.status === 'Pendente'
      ).length;
    }
  }

  get leitosDisponiveis() {
    return this.leitosTotal - this.leitosOcupados;
  }

  get ocupacao() {

    if (this.leitosTotal === 0) {
      return 0;
    }

    return Math.round(
      this.leitosOcupados / this.leitosTotal * 100
    );
  }

  voltarDashboard() {
    this.router.navigate(['/dashboard']);
  }

}