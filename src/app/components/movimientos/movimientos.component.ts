import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario';
import { Movimiento } from './../../models/movimiento';
import { MovimientoService } from './../../services/movimiento.service';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  breadCrumb = []
  movimientos: Movimiento[] = []
  arrayBreadCrumb = []
  cliente: Usuario
  clientes: Usuario[]
  proveedor: Usuario
  proveedores: Usuario[]
  fondo: Usuario
  fondos: Usuario[]
  nro
  showCrearMovimiento = false;
  nroFacturaProveedor
  fechaMovimiento
  monto
  comentario
  constructor(
    public _movimientoService: MovimientoService,
    public _usuarioService: UsuarioService
  ) { }
  tipos_movimiento
  tipo
  async ngOnInit() {
    this.tipos_movimiento = await this._movimientoService.getTipoMovimiento()
    this.movimientos = await this._movimientoService.getMovimientos()
    console.log(this.movimientos);
    this.clientes = await this._usuarioService.buscarUsuarios('CLIENTES', '')
    this.proveedores = await this._usuarioService.buscarUsuarios('PROVEEDORES', '')
    this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', '')
  }

  async selectCategory(tipo) {
    this.tipo = tipo
    history.forward()
    console.log(tipo);
    if (!tipo) {
      return
    }
    this.breadCrumb.push(tipo)
    let padre = tipo.nombre_padre ? tipo.nombre_padre : tipo.descripcion;
    this.tipos_movimiento = await this._movimientoService.getTipoMovimiento(this.breadCrumb.length + 1, tipo.cuenta)
    this.movimientos = await this._movimientoService.getMovimientos(tipo.cuenta)
    console.log(this.movimientos);
  }

  async searchTipoMovimientos(event) {
    if (this.breadCrumb.length > 0 && event.term) {
      this.tipos_movimiento = await this._movimientoService.buscarTipoMovimientos(event.term, this.breadCrumb.length + 1)

    }

  }
  customSearchFnMovimientos(term: string, item: any) {
    term = term.toLowerCase();
    return item.descripcion.toLowerCase().indexOf(term) > -1 ||
      item.nombre_padre.toLowerCase().includes(term)
      
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.NOMBRES.toLowerCase().indexOf(term) > -1 ||
      item.APELLIDOS.toLowerCase().includes(term) ||
      item.RAZON.toLowerCase().includes(term) ||
      item.RUC.toLowerCase().includes(term);
  }

  add(event) {
    console.log(event);

  }

  async navigateBreadcrumb(i) {
    this.tipo = this.breadCrumb[i]

    this.breadCrumb = this.breadCrumb.slice(0, i + 1);
    console.log(this.tipo.ctapadre);

    if (this.tipo.ctapadre == "0") {
      this.tipos_movimiento = await this._movimientoService.getTipoMovimiento(2, this.tipo.cuenta)
      console.log("cero");

    } else {
      this.tipos_movimiento = await this._movimientoService.getTipoMovimiento(2, this.tipo.cuenta)
    }
    console.log(this.tipos_movimiento);
    this.movimientos = await this._movimientoService.getMovimientos(this.tipo.cuenta)


  }


  async resetBreadcrumb() {
    this.tipos_movimiento = await this._movimientoService.getTipoMovimiento()
    this.breadCrumb = []
    this.movimientos = []

  }


async  crearMovimiento() {
    let movimiento: Movimiento = {
      cliente: this.cliente,
      fondo: this.fondo,
      proveedor: this.proveedor,
      comentario: this.comentario,
      fecha_creacion_unix: new Date().getTime(),
      nro_factura: this.nro,
      nro_comp_banco: this.nroFacturaProveedor,
      id_cuentacaja: this.tipo.cuenta,
      nombre: this.tipo.descripcion,
      anulado: "0",
      monto_haber: this.monto
    }
    console.log(movimiento);
    
    let resp = await this._movimientoService.crearMovimiento(movimiento)
    console.log(resp);
    
  }

  async searchClientes(val) {
    if (val.term.length > 0) {
      this.clientes = await this._usuarioService.buscarUsuarios('CLIENTES', val.term)
    }
  }
  async searchProveedores(val) {
    if (val.term.length > 0) {
      this.proveedores = await this._usuarioService.buscarUsuarios('PROVEEDORES', val.term)

    }
  }
  async searchBancos(val) {
    this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', val.term)
  }

}
