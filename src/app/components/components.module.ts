import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ListaContratosComponent } from './lista-contratos/lista-contratos.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { InfoContratoComponent } from './info-contrato/info-contrato.component';
import { CuotaComponent } from './cuota/cuota.component';
import { FacturasComponent } from './facturas/facturas.component'; 



@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ListaContratosComponent, UsuariosComponent, PerfilUsuarioComponent, InfoContratoComponent, CuotaComponent, FacturasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ListaContratosComponent
  ]

})
export class ComponentsModule { }
