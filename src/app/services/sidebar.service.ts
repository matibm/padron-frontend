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
