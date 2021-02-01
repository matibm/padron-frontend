import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(
    public http: HttpClient,public _usuarioService: UsuarioService
  ) { }

  getProductos() {
    let url = URL_SERVICIOS + '/producto/all';
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.productos
    })
  }
 
  
}
