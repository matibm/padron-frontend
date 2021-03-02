import { PipeModule } from './../pipes/pipe.module';
import { NombreCortoPipe } from './../pipes/nombre-corto.pipe';
import { AvatarModule } from 'ngx-avatar';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ListaContratosComponent } from './lista-contratos/lista-contratos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { InfoContratoComponent } from './info-contrato/info-contrato.component';
import { FacturaComponent } from './factura/factura.component';
import { FacturasComponent } from './facturas/facturas.component';

import { NgxLoadingModule } from 'ngx-loading';
import { CrearEgresoComponent } from './crear-egreso/crear-egreso.component';
import { ListaMovimientosComponent } from './lista-movimientos/lista-movimientos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContratoPdfComponent } from './contrato-pdf/contrato-pdf.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { InfoCajaComponent } from './info-caja/info-caja.component';
import { EditarContratoComponent } from './editar-contrato/editar-contrato.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [IncrementadorComponent,
    DonaComponent,
    ListaContratosComponent,
    UsuariosComponent,
    PerfilUsuarioComponent,
    InfoContratoComponent,
    FacturaComponent,
    FacturasComponent,
    CrearEgresoComponent,
    ListaMovimientosComponent,
    MovimientosComponent,
    ContratoPdfComponent,
    CrearUsuarioComponent,
    InfoCajaComponent,
    EditarContratoComponent,

  ],
  imports: [
    AvatarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule, SweetAlert2Module.forRoot(),

    NgSelectModule,
    RouterModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    PipeModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ListaContratosComponent,

  ]

})
export class ComponentsModule { }
