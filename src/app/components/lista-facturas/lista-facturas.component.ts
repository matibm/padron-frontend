import { Producto } from './../../models/producto';
import { UsuarioService } from './../../services/usuario.service';
import { ProductosService } from './../../services/productos.service';
import { FacturaService } from './../../services/factura.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {

  constructor(public _facturaService: FacturaService,
    public _usuarioService: UsuarioService,

    public _productoService: ProductosService

  ) { }

  opciones
  fondo
  fondos
  fechaEmisionStart
  fechaEmisionEnd
  fechaVencimientoStart
  fechaVencimientoEnd
  fechaPagadoStart
  fechaPagadoEnd
  cliente
  clientes
  servicio
  servicios
  facturas
  cobrador
  cobradores
  vendedor
  vendedores
  count
  async ngOnInit() {
    let respF = await this._facturaService.getFacturasOptions(this.opciones)
    this.count = respF.count
    this.facturas = respF.facturas
    this.servicios = await this._productoService.getProductos()
    this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', '')
  }

  async filtrar() {
    this.opciones = {
      titular: this.cliente ? this.cliente._id : null,
      vendedor: this.vendedor ? this.vendedor._id : null,
      cobrador: this.cobrador ? this.cobrador._id : null,
      servicio: this.servicio ? this.servicio._id : null,
      fondo: this.fondo ? this.fondo._id : null,
    }
    let respF = await this._facturaService.getFacturasOptions(this.opciones)
    this.count = respF.count
    this.facturas = respF.facturas
  }

  seleccionarProducto(producto: Producto) {

    this.servicio = producto;

  }

  async searchClientes(val) {
    if (val.term.length > 0) {
      this.clientes = await this._usuarioService.buscarUsuarios('CLIENTES', val.term)
    }
  }

  async searchcobradores(val) {
    if (val.term.length > 0) {
      this.cobradores = await this._usuarioService.buscarUsuarios('COBRADORES', val.term)

    }
  }
  async searchFondos(val) {
    if (val.term.length > 0) {
      this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', val.term)

    }
  }
  async searchvendedores(val) {
    if (val.term.length > 0) {
      this.vendedores = await this._usuarioService.buscarUsuarios('VENDEDORES', val.term)

    }
  } customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.NOMBRES.toLowerCase().indexOf(term) > -1 ||
      item.APELLIDOS.toLowerCase().includes(term) ||
      item.RAZON.toLowerCase().includes(term) ||
      item.RUC.toLowerCase().includes(term);
  }
}
