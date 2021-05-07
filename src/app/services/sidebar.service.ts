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
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-multiple',
      submenu: [
        
        { titulo: 'crear usuario', url: 'crear_usuario' },
        { titulo: 'lista de usuarios', url: 'usuarios' },
      ]
    },
    {
      titulo: 'Contratos',
      icono: 'mdi mdi-file-document',
      submenu: [
        { titulo: 'crear contrato', url: 'crear_contrato' },
        { titulo: 'lista de contratos', url: 'lista_contratos' },
       ]
    },
    {
      titulo: 'Productos',
      icono: 'mdi mdi-shopping',
      submenu: [
        { titulo: 'crear producto', url: 'crear_producto' },
        { titulo: 'lista de productos', url: 'lista_productos' }
       ]
    },
    
    {
      titulo: 'Finanzas',
      icono: 'mdi mdi-cash',
      submenu: [
        { titulo: 'Ingresos', url: 'facturas' },
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
