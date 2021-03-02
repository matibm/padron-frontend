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
  ) { }

  cerrarCaja(start, end, fondo?) {

    let url = URL_SERVICIOS + '/caja/cerrar_caja';
    url += `?token=${this._usuarioService.token}`        
    start ? url += `&start=${start}` : null    
    end ? url += `&end=${end}` : null
    fondo ? url += `&fondo=${fondo}` : null

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp
    })
  }

}
