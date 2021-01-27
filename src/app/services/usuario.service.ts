import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(
    public http: HttpClient
  ) { }

  getUsuarios() {
    let url = URL_SERVICIOS + '/usuario/all';
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  getClientes() {
    let url = URL_SERVICIOS + '/usuario/clientes';
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  getVendedores() {
    let url = URL_SERVICIOS + '/usuario/vendedores';
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  getCobradores() {
    let url = URL_SERVICIOS + '/usuario/cobradores';
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  buscarUsuarios(tipo, busqueda) {
    let url = `${URL_SERVICIOS}/usuario/search/${tipo}/${busqueda}`;
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
 
}
