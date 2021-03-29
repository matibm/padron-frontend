import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  urlActual
  menu: any[] = [
    {
      titulo: 'Contrato',
      icono: 'mdi mdi-file-document',
      submenu: [
        { titulo: 'nuevo contrato', url: 'crear_contrato' },
        { titulo: 'lista de contratos', url: 'lista_contratos' },
       ]
    },
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-multiple',
      submenu: [
        { titulo: 'General', url: 'usuarios' },
       
        { titulo: 'Nuevo Usuario', url: 'nuevo_usuario' },
      ]
    },
    {
      titulo: 'Finanzas',
      icono: 'mdi mdi-cash',
      submenu: [
        { titulo: 'Facturas', url: 'facturas' },
        { titulo: 'Movimientos', url: 'movimientos' },
        { titulo: 'caja', url: 'info_caja' },
        { titulo: 'resumen', url: 'resumen' },
        { titulo: 'transferencias', url: 'transferencia' },
      ]
    }
  ]
 
  refreshRoute() {
    this.urlActual = this.router.url
    console.log("cambiando url", this.urlActual);

  }
  usuario
  constructor(private router: Router, public _usuario: UsuarioService) {
    this.usuario = _usuario.usuario
  }
}
