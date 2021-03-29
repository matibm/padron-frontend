import { URL_SERVICIOS } from './../config/global';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
    this.getCajaActual()
  }

  cajaActual

  cerrarCaja(start, end, fondo?) {

    let url = URL_SERVICIOS + '/caja/cerrar_caja';
    url += `?token=${this._usuarioService.token}`
    url += `&caja=${this.cajaActual._id}`
    start ? url += `&start=${start}` : null
    end ? url += `&end=${end}` : null
    fondo ? url += `&fondo=${fondo}` : null

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp
    })
  }

  getCajaActual() {
    let url = URL_SERVICIOS + '/caja/caja_actual';
    url += `?token=${this._usuarioService.token}`

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);
      this.cajaActual = resp.caja
      return resp.caja
    })
  }
  getCierresDeCaja() {
    let url = URL_SERVICIOS + '/caja/lista_cierres';
    url += `?token=${this._usuarioService.token}`

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.cierres
    })
  }

}
