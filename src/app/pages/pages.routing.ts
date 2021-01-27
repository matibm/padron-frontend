import { CrearContratoComponent } from './../components/crear-contrato/crear-contrato.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
    {
        path: 'contrato', 
        component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'progress', component: ProgressComponent},
          {path: 'crear_contrato', component: CrearContratoComponent},
          {path: 'grafica1', component: Grafica1Component},
          {path: 'account-settings', component: AccountSettingsComponent},
          
        ]
    
    
      },
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'progress', component: ProgressComponent},
          {path: 'crear_contrato', component: CrearContratoComponent},
          {path: 'grafica1', component: Grafica1Component},
          {path: 'account-settings', component: AccountSettingsComponent},
          
        ]
    
    
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
