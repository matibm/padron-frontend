import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) { }

  getExcel(body) {

    let url = URL_SERVICIOS + '/persona/filter';
    // url += `?token=${this._usuarioService.token}`

    let timerInterval
    swal.fire({
      title: 'Generando Archivo',
      html: 'Por favor espere unos segundos',
       // timerProgressBar: true,
      didOpen: () => {
        swal.showLoading()
       
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    let bodyAux = {}

    Object.entries(body).forEach(([key, value]) => {
      if (value) {
         
        bodyAux[key] = body[key]
      }
    });
    body = bodyAux

    return this.http.post(url, body, { responseType: 'blob' })
  }
  getLista(body, tipo) {
    let bodyAux = {}
    Object.entries(body).forEach(([key, value]) => {
      if (value) {
         
        bodyAux[key] = body[key]
      }
    });
    body = bodyAux
    let url = URL_SERVICIOS + '/persona/lista';
    url += `?token=${this._usuarioService.token}`
    url += `&distinct_code=${tipo}`

    return this.http.post(url, body).toPromise().then((data: any) => {
      return data.usuarios
    })
  }
  getPersonas(body) {

    let url = URL_SERVICIOS + '/persona/personas';
    url += `?token=${this._usuarioService.token}`
    let bodyAux = {}

    Object.entries(body).forEach(([key, value]) => {
      if (value) {
         
        bodyAux[key] = body[key]
      }
    });
    body = bodyAux

    return this.http.post(url, body).toPromise().then((data: any) => {
      return data.personas
    })
  }
  votar(ci) {

    let url = URL_SERVICIOS + '/persona/votar/' + ci;
    url += `?token=${this._usuarioService.token}`
    return this.http.get(url).toPromise().then((data: any) => {
      swal.fire({
        icon: 'success',
        title: 'Votaci??n realizada',
        text: data.message,
        timer: 10000,
      })
      return data.message
    },
      (error) => {
        console.error(error.error.message);
        
        swal.fire({
          icon: 'error',
          title: 'Votaci??n incorrecta',
          text: error?.error?.message,
         
        })
      }
    )
  }
}
