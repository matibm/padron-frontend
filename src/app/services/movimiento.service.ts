import { URL_SERVICIOS } from './../config/global';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService

  ) { }
  getTipoMovimiento(nivel?, padre?) {
    console.log("nivel", nivel);
    console.log("padre:", padre);

    let url = `${URL_SERVICIOS}/movimientos/tipos/all`;
    url += `?token=${this._usuarioService.token}`
    url += `&nivel=${nivel}`
    if (padre) {
      url += `&padre=${padre}`

    }
    return this.http.get(url).toPromise().then((resp: any) => {

      return resp.tipos_movimiento
    })
  }
  getMovimientos(tipo_id?) {

    let url = `${URL_SERVICIOS}/movimientos/by_type`;
    url += `?token=${this._usuarioService.token}`
    tipo_id ? url += `&tipo_id=${tipo_id}` : null;
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.movimientos
    })
  }
  buscarTipoMovimientos(query, nivel) {
    console.log(query);
    console.log(nivel);

    let url = `${URL_SERVICIOS}/movimientos/search`;
    url += `?token=${this._usuarioService.token}`
    url += `&query=${query}`
    url += `&nivel=${nivel}`
    console.log(url);

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.tipo_movimientos
    })
  }

  crearMovimiento(movimiento){

    let url = `${URL_SERVICIOS}/movimientos/crear_movimiento`;
    url += `?token=${this._usuarioService.token}`
 
    return this.http.post(url, movimiento).toPromise().then((resp: any) => {
      console.log(resp);
      

      return resp.movimiento
    })
  }

}
