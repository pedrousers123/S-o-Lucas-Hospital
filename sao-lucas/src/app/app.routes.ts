import { Routes } from '@angular/router';

import { Login } from './/login/login';
import { Cadastro } from './/cadastro/cadastro';
import { Dashboard } from './/dashboard/dashboard';
import { Pacientes } from './/pacientes/pacientes';
import { Medicos } from './pages/medicos/medicos';
import { Consultas } from './pages/medicos/consultas/consultas';
import { Internacoes } from './/internacoes/internacoes';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'cadastro',
    component: Cadastro
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'pacientes',
    component: Pacientes
  },

  {
    path: 'medicos',
    component: Medicos
  },

  {
    path: 'consultas',
    component: Consultas
  },

  {
    path: 'internacoes',
    component: Internacoes
  }

];