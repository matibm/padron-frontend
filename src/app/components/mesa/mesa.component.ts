import swal from 'sweetalert2';
import { PersonaService } from './../../services/persona.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  constructor(
    public _usuarioService: UsuarioService,
    private _personaService: PersonaService
  ) { }
  opciones: any = {}
  persona
  personas
  async ngOnInit() {
    console.log(this._usuarioService.usuario);
    let usuario = this._usuarioService.usuario
    this.opciones.desc_dep = usuario.desc_dep
    this.opciones.desc_dis = usuario.desc_dis
    this.opciones.desc_locanr = usuario.desc_locanr
    this.opciones.desc_sec = usuario.desc_sec
    this.opciones.mesa = usuario.mesa

    let personas = await this._personaService.getPersonas(this.opciones)
    console.log(personas);
    this.personas = personas
  }


  async buscar(busqueda, tipo) {
    if (!busqueda) {
      return
    }
    let resultado
    if (tipo === 'ci') {
      this.opciones.numero_ced = busqueda
      resultado = await this._personaService.getPersonas(this.opciones)
    } else if (tipo === 'orden') {
      this.opciones.orden = busqueda

      resultado = await this._personaService.getPersonas(this.opciones)
    }
    
    this.persona = resultado[0]
    if (!this.persona) {
      swal.fire({
        icon: 'error',
        title: 'No se encontró votante',
          
        showConfirmButton: true
      }) 
    }else this.votar(this.persona.numero_ced)
  }

  async votar(cedula) {
    //  await this._personaService.votar(cedula)
    // this.persona = null
    swal.fire({
      icon: 'warning',
      title: 'Confirmar Voto',
      html: `
      <span>Orden: <b>${this.persona.orden}</b></span>
      <br>
      <span>Nombre: <b>${this.persona.apellido}, ${this.persona.nombre}</b> </span> 
      <br>
      <span>Nro C.I.: <b>${this.persona.numero_ced}</b></span>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#06d79c',

      showConfirmButton: true
    }).then(async res => {

      if (res.isConfirmed == true) {
        await this._personaService.votar(cedula)
        this.ngOnInit()
      } else {

      }
    })
  }


}




