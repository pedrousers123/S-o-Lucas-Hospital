import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  nomeUsuario = 'Administrador';

  pacientes = 128;
  medicos = 24;
  consultasHoje = 18;
  internacoes = 12;

  constructor(private router: Router) {}

  abrirPacientes(): void {
    this.router.navigate(['/pacientes']);
  }

  abrirMedicos(): void {
    this.router.navigate(['/medicos']);
  }

  abrirConsultas(): void {
    this.router.navigate(['/consultas']);
  }

  voltarLogin(): void {
    this.router.navigate(['/login']);
  }

}