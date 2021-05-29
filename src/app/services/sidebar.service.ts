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
      titulo: 'MENU',
      icono: 'mdi mdi-menu',
      submenu: [
        
        { titulo: 'Crear usuario', url: 'crear_usuario' },
        { titulo: 'Lista de usuarios', url: 'usuarios' },
        { titulo: 'Reporte', url: '/reporte' },
        { titulo: 'Mesa', url: '/mesa' },
        { titulo: 'Inicio', url: '/admin' },
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
