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
        { titulo: 'lista de contratos', url:'progress'},
        { titulo: 'Graficas', url:'grafica1'},
      ]
    }
  ]
  
  
  constructor() { }
}
