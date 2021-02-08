import { URL_SERVICIOS } from './../config/global';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService

  ) { }

  crearFactura(factura) {

    let url = URL_SERVICIOS + '/factura/new';
    url += `?token=${this._usuarioService.token}`


    return this.http.post(url, factura).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.factura
    })
  }
  pagarFactura(factura) {

    let url = URL_SERVICIOS + '/factura/pagar';
    url += `?token=${this._usuarioService.token}`
    return this.http.post(url, factura).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.factura
    })
  }
  getFacturaById(id) {
    let url = `${URL_SERVICIOS}/factura/by_id/${id}`;
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.factura
    })
  }
  getFacturasByTitular(id) {
    let url = `${URL_SERVICIOS}/factura/by_titular/${id}`;
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.facturas
    })
  }
  getFacturasByContrato(id) {
    let url = `${URL_SERVICIOS}/factura/by_contrato/${id}`;
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.facturas
    })
  }

  getFacturas(page?) {
    let p = page || 1
    let url = URL_SERVICIOS + '/factura/all';
    url += `?token=${this._usuarioService.token}`
    url += `&page=${p}`

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp
    })
  }

}
