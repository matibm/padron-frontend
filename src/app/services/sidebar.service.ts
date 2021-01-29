import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Contrato',
      icono: 'mdi mdi-file-document',
      submenu: [
        { titulo: 'nuevo contrato', url:'crear_contrato'},
        { titulo: 'lista de contratos', url:'lista_contratos'},
        { titulo: 'Graficas', url:'grafica1'},
      ]
    },
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-multiple',
      submenu: [
        { titulo: 'General', url:'usuarios'},
        { titulo: 'Clientes', url:'clientes'},
        { titulo: 'Vendedores', url:'vendedores'},
      ]
    }
  ]
  
  
  constructor() { }
}
