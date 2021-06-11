import { UsuarioP } from './../../models/usuariop';
import { PersonaService } from './../../services/persona.service';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService,
    private router: Router,
    public _personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.getLista()
  }

  nivel = 1
  isVendedor
  isProveedor
  isCobrador
  ismesa
  isreporte
  isadmin
  isContratado
  isCliente
  isEmpleado
  ruc
  isPersona
  isEmpresa
  isBanco
  manejaCaja
  usuario:UsuarioP = {}
  departamentos  
  distritoSeleccionado
  seccionalSeleccionado
  seccionales  
  localSeleccionado
  mesaSeleccionado
  mesas
  locales 
  distritos  
  opciones: any = {nombre: ''}
  dptoSeleccionado
  async crearUsuario() {
     
    this.usuario.ismesa = this.ismesa
    this.usuario.isreporte = this.isreporte
    this.usuario.isadmin = this.isadmin
    this.usuario.desc_dep = this.dptoSeleccionado,
    this.usuario.desc_dis = this.distritoSeleccionado
    this.usuario.desc_sec = this.seccionalSeleccionado
    this.usuario.desc_locanr = this.localSeleccionado
    this.usuario.mesa = this.mesaSeleccionado
    console.log(this.usuario);
    
    let us = await this._usuarioService.crearUsuario(this.usuario)
    // this.router.navigateByUrl('/admin/usuario/' + us._id)
  }

  allowCreate(): boolean {
    if (this.usuario.nombre && this.usuario.password && this.usuario.email ) {
      return true
    } else {
      return false
    }
  }


  async consultar(ruc){
    let consulta = await this._usuarioService.buscarUsuarios('ALL', ruc)    
    if (consulta) {
      swal.fire({
        icon: 'success',
        title: 'Usuario Existente',
         text: `${consulta[0].NOMBRES} ${consulta[0].APELLIDOS} `,
        timer: 3000,
      })
    }

  }

  async getLista(){
    this.departamentos = await this._personaService.getLista(this.opciones, 'desc_dep') 
    this.distritos = await this._personaService.getLista(this.opciones, 'desc_dis') 
    this.seccionales = await this._personaService.getLista(this.opciones, 'desc_sec') 
    this.locales = await this._personaService.getLista(this.opciones, 'desc_locanr') 
    this.mesas = await this._personaService.getLista(this.opciones, 'mesa') 
  }

}
