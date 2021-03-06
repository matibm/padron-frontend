import { Router } from '@angular/router';
import { FacturaService } from './../../services/factura.service';
import { UsuarioService } from './../../services/usuario.service';
import { Producto } from './../../models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  constructor(
    public _productoService: ProductosService,
    public _usuarioService: UsuarioService,
    public _facturaService: FacturaService,
    public route: Router
  ) { }
  servicio: Producto
  servicios
  cliente
  clientes
  cobrador
  cobradores
  vencimiento
  vencimientoString

  async ngOnInit() {

    this.servicios = await this._productoService.getProductos()

  }
  async searchClientes(val) {
    if (val.term.length > 0) {
      this.clientes = await this._usuarioService.buscarUsuarios('CLIENTES', val.term)
      console.log(this.clientes);

    }
  }
  async searchCobradores(val) {
    if (val.term.length > 0) {
      this.cobradores = await this._usuarioService.buscarUsuarios('COBRADORES', val.term)
      console.log(this.cobradores);

    }
  }

  customSearchFn(term: string, item: any) {
    if (term) {
      term = term.toLowerCase();

      return item.NOMBRES?.toLowerCase().indexOf(term) > -1 ||
        item.APELLIDOS?.toLowerCase().includes(term) ||
        item.RAZON?.toLowerCase().includes(term) ||
        item.RUC?.toLowerCase().includes(term);
    }
  }

  async crearFactura() {
    let body = {
      monto: this.servicio?.PRECIO_MAYORISTA,
      titular: this.cliente?._id || '',
      servicio: this.servicio?._id || '',
      cobrador: this.cobrador?._id || '',
      vencimiento: this.vencimiento || new Date().getTime()
    }
    let factura = await this._facturaService.crearFactura(body);
    this.route.navigateByUrl(`/admin/factura/${factura._id}`)
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


}
