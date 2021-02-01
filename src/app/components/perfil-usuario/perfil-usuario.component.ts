import { Contrato } from './../../models/contrato';
import { ContratoService } from './../../services/contrato.service';
import { Cuota } from './../../models/cuota';
import { CuotaService } from './../../services/cuota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  isVendedor
  isCobrador
  isCliente
  isEmpleado
  isPersona
  isEmpresa
  isBanco
  manejaCaja
  constructor(
    public _usuarioService: UsuarioService,
    public route: ActivatedRoute,
    public _cuotaService: CuotaService,
    public _contratoService: ContratoService
  ) { }
  id
  contratos: Contrato[]
  usuario: Usuario
  cuotas: Cuota[]
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usuario = await this._usuarioService.getUsuarioPorId(this.id)
    this.usuario.password = ''
    console.log(this.usuario);
    this.isVendedor = this.usuario.VENDEDORES == '1' ? 'check_vendedor' : null
    this.isCobrador = this.usuario.COBRADORES == '1' ? 'check_cobrador' : null
    this.isCliente = this.usuario.CLIENTES == '1' ? 'check_cliente' : null
    this.isEmpleado = this.usuario.EMPLEADOS == '1' ? 'check_empleado' : null
    this.isPersona = this.usuario.PERSONA == '1' ? 'check_persona' : null
    this.isEmpresa = this.usuario.EMPRESA == '1' ? 'check_empresa' : null
    this.isBanco = this.usuario.BANCOS == '1' ? 'check_banco' : null
    this.manejaCaja = this.usuario.MANEJA_CAJA == '1' ? 'check_maneja_caja' : null
    this.cuotas = await this._cuotaService.getCuotaByTitular(this.id)
    this.contratos = await this._contratoService.getContratosByTitular(this.id);
  }


  async actualizarUsuario(usuario){
    
    
    let resp = await this._usuarioService.modificarUsuarios(usuario)
    console.log(resp);
  }

}
