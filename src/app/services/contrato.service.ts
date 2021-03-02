import { UsuarioService } from './usuario.service';
import { Contrato } from './../models/contrato';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { URL_SERVICIOS } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(
    public http: HttpClient
    , public _usuarioService: UsuarioService
  ) { }

  getContratos(page?) {
    let p = page || 1
    let url = URL_SERVICIOS + '/contrato/all?page=' + p;
    url += `&token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp
    })
  }
  getContratosByTitular(id): Promise<Contrato[]> {

    let url = URL_SERVICIOS + '/contrato/by_titular/' + id;
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.contrato
    })
  }
  getContratoById(id): Promise<Contrato> {

    let url = URL_SERVICIOS + '/contrato/by_id/' + id;
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.contrato
    })
  }
  newContrato(contrato) {
    let url = URL_SERVICIOS + '/contrato/new';
    url += `?token=${this._usuarioService.token}`
    return this.http.post(url, contrato).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.contrato
    })
  }
  updateContrato(contrato, modifica_producto: boolean) {
    console.log(modifica_producto);
    
    let url = URL_SERVICIOS + '/contrato/edit';
    url += `?token=${this._usuarioService.token}`
    url += `&modifica_producto=${modifica_producto}`
    return this.http.post(url, contrato).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.contrato
    })
  }

}
