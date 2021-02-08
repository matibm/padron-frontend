import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
 @Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  itsLogued = false;
  token
  constructor(
    public http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.itsLogued = this.token ? true : false;
  }

  getUsuarios() {
    let url = URL_SERVICIOS + '/usuario/all';
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }

  getUsuarioPorId(id): Promise<Usuario> {
    let url = URL_SERVICIOS + `/usuario/id/${id}`;
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuario
    })
  }

  getClientes() {
    let url = URL_SERVICIOS + '/usuario/clientes';
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  getVendedores() {
    let url = URL_SERVICIOS + '/usuario/vendedores';
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  getCobradores() {
    let url = URL_SERVICIOS + '/usuario/cobradores';
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  buscarUsuarios(tipo, busqueda) {
    let url = `${URL_SERVICIOS}/usuario/search/${tipo}/${busqueda}`;
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  modificarUsuarios(usuario) {
    let url = `${URL_SERVICIOS}/usuario/edit/${usuario._id}`;
    url += `?token=${this.token}`
    return this.http.put(url, usuario).toPromise().then((resp: any) => {
      console.log(resp);
      return resp
    })
  }

  login(usuario) {
    console.log(usuario);
    
    let url = `${URL_SERVICIOS}/usuario/login`;
    return this.http.post(url, usuario).toPromise().then((resp: any) => {
      console.log(resp);
      return resp
    })
  }

  logout(){
    this.token = ''
    localStorage.removeItem('token');
    this.itsLogued = false;
  }



}
