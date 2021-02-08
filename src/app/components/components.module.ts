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
    MovimientosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
        NgSelectModule,

    RouterModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({})

  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ListaContratosComponent
  ]

})
export class ComponentsModule { }
