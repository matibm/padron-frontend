import { FacturasComponent } from './../components/facturas/facturas.component';
import { CuotaComponent } from './../components/cuota/cuota.component';
import { AuthGuard } from './../auth.guard';
import { InfoContratoComponent } from './../components/info-contrato/info-contrato.component';
import { PerfilUsuarioComponent } from './../components/perfil-usuario/perfil-usuario.component';
import { UsuariosComponent } from './../components/usuarios/usuarios.component';
import { ListaContratosComponent } from './../components/lista-contratos/lista-contratos.component';
import { CrearContratoComponent } from './../components/crear-contrato/crear-contrato.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
  // {
  //   path: 'contrato',
  //   component: PagesComponent,
  //   children: [
  //     { path: '', component: DashboardComponent },
  //     { path: 'progress', component: ProgressComponent },
  //     { path: 'crear_contrato', component: CrearContratoComponent },
  //     { path: 'lista_contratos', component: ListaContratosComponent },
  //     { path: 'usuarios', component: UsuariosComponent },
  //     { path: 'grafica1', component: Grafica1Component },
  //     { path: 'account-settings', component: AccountSettingsComponent },

  //   ]


  // },
  {
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'crear_contrato', component: CrearContratoComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuario/:id', component: PerfilUsuarioComponent },
      { path: 'lista_contratos', component: ListaContratosComponent },
      { path: 'info_contrato/:id', component: InfoContratoComponent },
      { path: 'cuota/:id', component: CuotaComponent },
      { path: 'facturas', component: FacturasComponent },

      { path: 'account-settings', component: AccountSettingsComponent },

    ]


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
