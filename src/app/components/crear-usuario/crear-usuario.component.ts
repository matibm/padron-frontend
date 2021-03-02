import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  nombres
  apellidos
  telefono
  email
  password

  isVendedor
  isCobrador
  isCliente
  isEmpleado
  isPersona
  isEmpresa
  isBanco
  manejaCaja
  crearUsuario() {
    let usuario: Usuario = {
      NOMBRES: this.nombres,
      APELLIDOS: this.apellidos,
      TELEFONO1: this.telefono,
      EMAIL: this.email,
      password: this.password
    }
    this.isVendedor == 'check_vendedor' ? usuario.VENDEDORES = '1' : usuario.VENDEDORES = '0'
    this.isCobrador == 'check_cobrador' ? usuario.COBRADORES = '1' : usuario.COBRADORES = '0'
    this.isCliente == 'check_cliente' ? usuario.CLIENTES = '1' : usuario.CLIENTES = '0'
    this.isEmpleado == 'check_empleado' ? usuario.EMPLEADOS = '1' : usuario.EMPLEADOS = '0'
    this.isPersona == 'check_persona' ? usuario.PERSONA = '1' : usuario.PERSONA = '0'
    this.isEmpresa == 'check_empresa' ? usuario.EMPRESA = '1' : usuario.EMPRESA = '0'
    this.isBanco == 'check_banco' ? usuario.BANCOS = '1' : usuario.BANCOS = '0'
    this.manejaCaja == 'check_maneja_caja' ? usuario.MANEJA_CAJA = '1' : usuario.MANEJA_CAJA = '0'
    console.log(usuario);

    this._usuarioService.crearUsuario(usuario)

  }

}
