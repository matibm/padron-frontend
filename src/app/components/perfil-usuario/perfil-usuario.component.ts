import { UsuarioP } from './../../models/usuariop';
import { PersonaService } from './../../services/persona.service';
import { MovimientoService } from './../../services/movimiento.service';
import { Movimiento } from './../../models/movimiento';
import { WhatsappService } from './../../services/whatsapp.service';
import { ComentarioService } from './../../services/comentario.service';
import { FacturaService } from './../../services/factura.service';
import { Contrato } from './../../models/contrato';
import { ContratoService } from './../../services/contrato.service';
import { Cuota } from './../../models/cuota';
import { CuotaService } from './../../services/cuota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { title } from 'process';

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
  movimientos: Movimiento[]
  isPersona
  isEmpresa
  isContratado
  isBanco
  manejaCaja
  cobroOnline
  pagos
  facturapdf
  constructor(
    public _usuarioService: UsuarioService,
    public route: ActivatedRoute,
    public _cuotaService: CuotaService,
    public _contratoService: ContratoService,
    public _facturaService: FacturaService,
    public _comentarioService: WhatsappService,
    public _movimientoService: MovimientoService,
    public _personaService: PersonaService

  ) { }
  id
  contratos: Contrato[]
  usuario: UsuarioP
  cuotas: Cuota[]
  facturas
  comentarios


  departamentos
  distritoSeleccionado
  seccionalSeleccionado
  seccionales
  localSeleccionado
  mesaSeleccionado
  mesas
  locales
  distritos
  opciones: any = { nombre: '' }
  dptoSeleccionado


  ismesa
  isreporte
  isadmin


  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usuario = await this._usuarioService.getUsuarioPorId(this.id)
    console.log(this.usuario);
    this.usuario.password = ''
    this.ismesa = this.usuario.ismesa
    this.isadmin = this.usuario.isadmin
    this.isreporte = this.usuario.isreporte

    this.dptoSeleccionado = this.usuario.desc_dep
    this.distritoSeleccionado = this.usuario.desc_dis
    this.localSeleccionado = this.usuario.desc_locanr
    this.seccionalSeleccionado = this.usuario.desc_sec
    this.mesaSeleccionado = this.usuario.mesa

    this.opciones.desc_dep = this.usuario.desc_dep
    this.opciones.desc_dis = this.usuario.desc_dis
    this.opciones.desc_locanr = this.usuario.desc_locanr
    this.opciones.desc_sec = this.usuario.desc_sec
    this.opciones.mesa = this.usuario.mesa
    await this.getLista()

    this.departamentos = await this._personaService.getLista({ nombre: '' }, 'desc_dep')

  }


 async refreshfiltros(elquecambio?) {
    if (elquecambio == 'depto') {
      this.opciones = { nombre: '' }
      this.opciones.desc_dep = this.dptoSeleccionado

      this.distritoSeleccionado = null
      this.localSeleccionado = null
      this.seccionalSeleccionado = null

      this.getLista()
    this.departamentos = await this._personaService.getLista({ nombre: '' }, 'desc_dep')

    } else{
      this.getLista()

    }

  }

  async actualizarUsuario() {

    this.usuario.desc_dep = this.opciones.desc_dep
    this.usuario.desc_dis = this.opciones.desc_dis
    this.usuario.desc_locanr = this.opciones.desc_locanr
    this.usuario.desc_sec = this.opciones.desc_sec
    this.usuario.mesa = this.opciones.mesa

     this.usuario.ismesa = this.ismesa 
     this.usuario.isadmin = this.isadmin 
     this.usuario.isreporte = this.isreporte 
    
    let resp = await this._usuarioService.modificarUsuarios(this.usuario)
  }
 

  async mostrarModal(id) {
    let resp = await this._facturaService.getDetallePago(id)

    let pago = resp.pago
    let facturas = resp.facturas
    let servicios = []
    for (let i = 0; i < facturas.length; i++) {
      const factura = facturas[i];
      servicios.push({
        cantidad: 1,
        concepto: factura.servicio.NOMBRE,
        precioUnitario: factura.haber,
        cincoPorciento: null,
        diezPorciento: factura.haber * 0.1
      })
    }
    this.facturapdf = {
      _id: pago._id,
      nombres: `${pago.cliente.NOMBRES} ${pago.cliente.APELLIDOS}`,
      fecha: pago.fecha_creacion,
      direccion: `direccion de prueba`,
      ruc: pago.cliente.RUC,
      tel: pago.cliente.TELEFONO1,
      notaDeRemision: '123123',
      servicios: servicios
    }
    console.log(this.facturapdf);

  }


  async getLista() {
    this.departamentos = await this._personaService.getLista(this.opciones, 'desc_dep')
    this.distritos = await this._personaService.getLista(this.opciones, 'desc_dis')
    this.seccionales = await this._personaService.getLista(this.opciones, 'desc_sec')
    this.locales = await this._personaService.getLista(this.opciones, 'desc_locanr')
    this.mesas = await this._personaService.getLista(this.opciones, 'mesa')
  }


  allowCreate(): boolean {
    if (this.usuario.nombre && this.usuario.password && this.usuario.email) {
      return true
    } else {
      return false
    }
  }


  modificarUsuario(){
    

  }



}
