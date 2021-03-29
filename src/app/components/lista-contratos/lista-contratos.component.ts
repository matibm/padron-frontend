import { Producto } from './../../models/producto';
import { ProductosService } from './../../services/productos.service';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario';
import { ContratoService } from './../../services/contrato.service';
import { Contrato } from './../../models/contrato';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.css']
})
export class ListaContratosComponent implements OnInit {

  constructor(public _contratoService: ContratoService,
    public _usuarioService: UsuarioService,
    public _productoService: ProductosService

  ) { }
  cliente: Usuario
  clientes: Usuario[]
  proveedor: Usuario
  proveedores: Usuario[]
  cobrador: Usuario
  cobradores: Usuario[]
  vendedor: Usuario
  vendedores: Usuario[]
  servicio
  servicios
  fila
  parcela
  manzana
  page = 1
  date_start_StiringTemporal
  date_end_StiringTemporal
  nro_contrato
  date_start
  date_end
  sort_key = 'fecha_creacion_unix'
  sort_value = -1
  options
  sort

  async ngOnInit() {
    this.options = {
      fecha_inicio: this.date_start ? this.date_start : null,
      fecha_fin: this.date_end ? this.date_end : null,
      cliente: this.cliente ? this.cliente._id : null,
      fila: this.fila,
      manzana: this.manzana,
      parcela: this.parcela,
      producto: this.servicio ? this.servicio._id : null,
      nro_contrato: '',
      cobrador: this.cobrador ? this.cobrador._id : null,
      vendedor: this.vendedor ? this.vendedor._id : null
    }
    this.sort = {
      key: this.sort_key,
      value: this.sort_value
    }
    let resp = await this._contratoService.getContratos(null, this.options, this.sort)
    this.servicios = await this._productoService.getProductos()

    this.contratos = resp.contratos
    this.count = resp.count
  }
  count = 0
  @Input() contratos: Contrato[]

  async pageChanged(page) {
    let resp = await this._contratoService.getContratos(page, this.options, this.sort)


    this.contratos = resp.contratos
    this.count = resp.count
    console.log(page);

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
  async searchvendedores(val) {
    if (val.term.length > 0) {
      this.vendedores = await this._usuarioService.buscarUsuarios('VENDEDORES', val.term)

    }
  }

  async filtrar() {
    this.options = {
      fecha_inicio: this.date_start,
      fecha_fin: this.date_end,
      cliente: this.cliente ? this.cliente._id : null,
      fila: this.fila,
      manzana: this.manzana,
      parcela: this.parcela,
      producto: this.servicio ? this.servicio._id : null,
      nro_contrato: '',
      cobrador: this.cobrador ? this.cobrador._id : null,
      vendedor: this.vendedor ? this.vendedor._id : null
    }
    this.sort = {
      key: this.sort_key,
      value: this.sort_value
    }
    let resp = await this._contratoService.getContratos(null, this.options, this.sort)
    this.servicios = await this._productoService.getProductos()

    this.contratos = resp.contratos
    console.log(resp);

    this.count = resp.count
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.NOMBRES.toLowerCase().indexOf(term) > -1 ||
      item.APELLIDOS.toLowerCase().includes(term) ||
      item.RAZON.toLowerCase().includes(term) ||
      item.RUC.toLowerCase().includes(term);
  }

  calcularFecha(stringDate) {

    let d = new Date(stringDate);
    d.setUTCHours(5)

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
      } else {
        // date is valid
        return d.getTime()

      }
    } else {
      // not a date
    }
  }

  async ordenar(value) {
    if (value === this.sort_key) {
      this.sort_value > 0 ? this.sort_value = -1 : this.sort_value = 1
    } else {
      this.sort_value = 1
    }
    let oldKeyAsc = document.getElementsByClassName('fa-sort-asc').item(0)
    if (oldKeyAsc) {
      oldKeyAsc.classList.remove('fa-sort-asc')
      oldKeyAsc.classList.add('fa-sort')
    }
    let oldKeyDesc = document.getElementsByClassName('fa-sort-desc').item(0)
    if (oldKeyDesc) {
      oldKeyDesc.classList.remove('fa-sort-desc')
      oldKeyDesc.classList.add('fa-sort')
    }
    this.sort_key = value
    this.sort = {
      key: this.sort_key,
      value: this.sort_value
    }
    console.log(document.getElementById(value));
    
    let newKey:any = document.getElementById(value).childNodes.item(1)
    if (!newKey) {
      return
    }
    newKey.classList.remove('fa-sort')
    newKey.classList.add(`fa-sort-${this.sort_value > 0 ? 'asc' : 'desc'}`)

    let resp = await this._contratoService.getContratos(null, this.options, this.sort)

    this.contratos = resp.contratos
    console.log(resp);

    this.count = resp.count
  }
}
