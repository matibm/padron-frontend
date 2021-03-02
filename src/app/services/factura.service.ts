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
  pagarFactura(factura, parcial?: boolean, monto_parcial?: number) {

    let url = URL_SERVICIOS + '/factura/pagar';
    url += `?token=${this._usuarioService.token}`
    parcial ? url += `&parcial=${parcial}` : null
    monto_parcial ? url += `&monto_parcial=${monto_parcial}` : null
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
    let url = `${URL_SERVICIOS}/factura/all`;
    url += `?token=${this._usuarioService.token}`
    url += `&contrato=${id}`

    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.facturas
    })
  }

  getFacturas(pagado?, fondo?, start?, end?, page?, titular?, cerrado?) {
    console.log(cerrado);

    let p = page || 1
    let url = URL_SERVICIOS + '/factura/all';
    url += `?token=${this._usuarioService.token}`
    url += `&page=${p}`
    pagado ? url += `&pagado=${pagado}` : null
    fondo ? url += `&fondo=${fondo}` : null
    start ? url += `&start=${start}` : null
    titular ? url += `&titular=${titular}` : null
    url += `&cerrado=${cerrado}`
    end ? url += `&end=${end}` : null



    return this.http.get(url).toPromise().then((resp: any) => {


      return resp
    })
  }
  getFacturasParcial(facturaId) {
    let url = URL_SERVICIOS + '/factura/all';
    url += `?token=${this._usuarioService.token}`
    url += `&factura_padre_id=${facturaId}`
    return this.http.get(url).toPromise().then((resp: any) => { 
      console.log(resp);
      
      return resp
    })
  }

}
