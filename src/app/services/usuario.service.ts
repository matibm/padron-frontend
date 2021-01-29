import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

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

  getUsuarioPorId(id): Promise<Usuario>{
    let url = URL_SERVICIOS + `/usuario/id/${id}`;
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuario
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
