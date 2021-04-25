import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  nivel = 1
  isVendedor
  isProveedor
  isCobrador
  isCliente
  isEmpleado
  ruc
  isPersona
  isEmpresa
  isBanco
  manejaCaja
  usuario: Usuario = {}
  async crearUsuario() {
    console.log(this.usuario);
    this.isVendedor == true ? this.usuario.VENDEDORES = '1' : this.usuario.VENDEDORES = '0'
    this.isProveedor == true ? this.usuario.PROVEEDORES = '1' : this.usuario.PROVEEDORES = '0'
    this.isCobrador == true ? this.usuario.COBRADORES = '1' : this.usuario.COBRADORES = '0'
    this.isCliente == true ? this.usuario.CLIENTES = '1' : this.usuario.CLIENTES = '0'
    this.isEmpleado == true ? this.usuario.EMPLEADOS = '1' : this.usuario.EMPLEADOS = '0'
    this.isPersona == true ? this.usuario.PERSONA = '1' : this.usuario.PERSONA = '0'
    this.isEmpresa == true ? this.usuario.EMPRESA = '1' : this.usuario.EMPRESA = '0'
    this.isBanco == true ? this.usuario.BANCOS = '1' : this.usuario.BANCOS = '0'
    this.manejaCaja == true ? this.usuario.MANEJA_CAJA = '1' : this.usuario.MANEJA_CAJA = '0'

    let us = await this._usuarioService.crearUsuario(this.usuario)
    this.router.navigateByUrl('/admin/usuario/' + us._id)
  }

  allowCreate(): boolean {
    if (this.usuario.NOMBRES && this.usuario.APELLIDOS && this.usuario.TELEFONO1 ) {
      return true
    } else {
      return false
    }
  }

}
