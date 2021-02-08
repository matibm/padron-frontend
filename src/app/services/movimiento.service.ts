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

    let url = `${URL_SERVICIOS}/movimientos/tipos/all`;
    url += `?token=${this._usuarioService.token}`
    url += `&nivel=${nivel}`
    if (padre) {
      url += `&padre=${padre}`
      
    }
    return this.http.get(url).toPromise().then((resp: any) => {
      console.table(resp.tipos_movimiento);

      return resp.tipos_movimiento
    })
  }


}
