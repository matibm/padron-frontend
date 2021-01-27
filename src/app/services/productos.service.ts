import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(
    public http: HttpClient
  ) { }

  getProductos() {
    let url = URL_SERVICIOS + '/producto/all';
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.productos
    })
  }
 
  
}
