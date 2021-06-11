import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
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
  user_id
  usuario
  constructor(
    public http: HttpClient
  ) {
    this.cargarStorage()
    this.token = localStorage.getItem('token');
    this.user_id = localStorage.getItem('user_id');
    this.itsLogued = this.token ? true : false;

    // this.inicializarUsuario()
  }

  async inicializarUsuario() {

    if (this.user_id) {
      this.usuario = await this.getUsuarioPorId(this.user_id)
    }
  }
  getUsuarios() {
    let url = URL_SERVICIOS + '/usuario/all';
    url += `?token=${this.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }

  getUsuarioPorId(id): Promise<Usuario> {
    let url = URL_SERVICIOS + `/persona/usuario_by_id/${id}`;
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
    console.log("buscando", busqueda);

    let url = `${URL_SERVICIOS}/buscar_usuario/${busqueda}`;
    url += `?token=${this.token}`
    // url += `&query=${busqueda}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  buscarCandidatos(busqueda, opciones) {

    console.log("buscando", busqueda);
    let bodyAux = {}

    Object.entries(opciones).forEach(([key, value]) => {
      if (value) {

        bodyAux[key] = opciones[key]
      }
    });
    opciones = bodyAux
    let url = `${URL_SERVICIOS}/persona/get_candidatos`;
    url += `?token=${this.token}`
    url += `&search=${busqueda}`
    return this.http.post(url, opciones).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.usuarios
    },
      (error) => {
        console.log(error);

      })
  }
  getUsuariosP(body) {

    let url = `${URL_SERVICIOS}/persona/lista_usuario`;
    url += `?token=${this.token}`
    // url += `&query=${busqueda}`

    let bodyAux = {}

    Object.entries(body).forEach(([key, value]) => {
      if (value) {

        bodyAux[key] = body[key]
      }
    });
    body = bodyAux
    return this.http.post(url, body).toPromise().then((resp: any) => {
      return resp.usuarios
    })
  }
  modificarUsuarios(usuario) {
    let url = `${URL_SERVICIOS}/persona/editar_usuario`;
    url += `?token=${this.token}`
    console.log(usuario);
    this.usuario = usuario
    return this.http.post(url, usuario).toPromise().then((resp: any) => {
      console.log(resp);

      swal.fire({
        icon: 'success',
        title: 'Usuario modificado',
        // text: 'I will close in 2 seconds.',
        timer: 2000,
      })
      return resp
    })
  }

  crearUsuario(usuario) {
    let url = `${URL_SERVICIOS}/persona/crear_usuario`;
    url += `?token=${this.token}`
    
    let bodyAux = {}

    Object.entries(usuario).forEach(([key, value]) => {
      if (value) {

        bodyAux[key] = usuario[key]
      }
    });
    usuario = bodyAux
    return this.http.post(url, usuario).toPromise().then((resp: any) => {
      console.log(resp);
      swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        // text: 'I will close in 2 seconds.',
        timer: 2000,
      })
      return resp.usuario
    }, (error) => {
      console.log(error);

      swal.fire({
        icon: 'error',
        title: 'Error al crear usuario',
        text: error?.statusText

      })
      return error
    })
  }

  login(usuario) {
    console.log(usuario);

    let url = `${URL_SERVICIOS}/persona/login`;
    return this.http.post(url, usuario).toPromise().then((resp: any) => {
      console.log(resp);
      this.usuario = resp.user
      this.user_id = resp.user._id
      localStorage.setItem('user_id', this.user_id)
      return resp
    })
  }

  logout() {
    this.token = ''
    localStorage.removeItem('token');
    this.itsLogued = false;
  }


  getUsuario(id) {
    let url = URL_SERVICIOS + '/persona/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map((data: any) => {
      console.log(data);

      return data.usuario
    }))
  }
  cargarStorage() {
    let p = new Promise((error) => {

      if (localStorage) {
        //console.log("funcion");

      }
      if (localStorage.getItem('token')) {

        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
      } else {
        this.token = '';
        this.usuario = null

      }
    }).catch(err => {
      //console.log(err);
    })

    // p.then(()=>{
    // //console.log("oiko");

    // })
  }

  estaLogueado() {
    let id = localStorage.getItem('id')
    if (!id) {
      return false
    }

    return this.getUsuario(id).toPromise().then((resp: any) => {

      return true

    }).catch(err => {

      console.log(err);

      this.logout()

      return false
    })



  }


}
