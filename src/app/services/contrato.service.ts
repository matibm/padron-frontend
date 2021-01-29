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
  ) { }

  getContratos(page?) {
    let p = page || 1
    let url = URL_SERVICIOS + '/contrato/all?page=' + p;
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp
    })
  }
  getContratosByTitular(id): Promise<Contrato[]> {

    let url = URL_SERVICIOS + '/contrato/by_titular/' + id;
    return this.http.get(url).toPromise().then((resp: any) => {
      console.log(resp);
      
      return resp.contrato
    })
  }
  newContrato(contrato) {
    let url = URL_SERVICIOS + '/contrato/new';
    return this.http.post(url, contrato).toPromise().then((resp: any) => {
      console.log(resp);

      return resp.contrato
    })
  }

}
