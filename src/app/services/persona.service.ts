import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) { }

  getExcel(body) {

    let url = URL_SERVICIOS + '/persona/filter';
    // url += `?token=${this._usuarioService.token}`

    return this.http.post(url, body, { responseType: 'blob' })
  }
  getLista(body, tipo) {

    let url = URL_SERVICIOS + '/persona/lista';
    url += `?token=${this._usuarioService.token}`
    url += `&distinct_code=${tipo}`

    return this.http.post(url, body).toPromise().then((data: any) => {
      return data.usuarios
    })
  }
}
