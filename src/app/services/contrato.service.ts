import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(
    public http: HttpClient
  ) { }

  getContratos() {
    let url = URL_SERVICIOS + '/contrato/all';
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.contratos
    })
  }
  newContrato(contrato) {
    let url = URL_SERVICIOS + '/contrato/new';
    return this.http.post(url, contrato).toPromise().then((resp: any) => {
      return resp.contrato
    })
  }

}
