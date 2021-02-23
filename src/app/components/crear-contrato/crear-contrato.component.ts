import { Contrato } from '../../models/contrato';
import { Inhumado } from '../../models/unhumado';
import { ContratoService } from '../../services/contrato.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/usuario';
import { Component, OnInit } from '@angular/core';
// import { Options } from 'select2';
import { SwalPortalTargets, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.css']
})
export class CrearContratoComponent implements OnInit {

  cliente: Usuario
  clientes: Usuario[] = null
  productos: Producto[] = null
  vendedores: Usuario[] = null
  clientesSearch = this.clientes;
  prodductosSearch = this.productos;
  vendedoresSearch = this.vendedores;
  cobradoresSearch = this.vendedores;
  entrega = 0
  fechaMantenimiento
  stringFechaMantenimiento
  producto: Producto
  saldo = 0
  vendedor: Usuario
  nro_contrato = ''
  cobrador: Usuario
  plazo: number
  contrato: Contrato
  montoCuotas
  model = '2020-03-12'
  radioLugarCobranza = 'particular'
  beneficiarioVacio = {
    nombre: '',
    doc: '',
    fecha_nacimiento: '',
    edad: '',
    plus_edad: 0
  }
  cobradores

  esUdp = false;
  beneficiarios = [
    {
      nombre: '',
      doc: '',
      fecha_nacimiento: '',
      edad: '',
      plus_edad: 0
    }
  ]
  inhumadoVacio = {
    fecha_fallecimiento: '',
    fecha_inhumacion: '',
    nombre: '',
    ci: '',

  }
  inhumados: Inhumado[] = [this.inhumadoVacio]
  facturas
  radioValue = 'administracion'
  fechaPago = new Date()
  pagoradioValue = 'contado'
  stringFechaPago
  servicioCMP
  numeroFactura
  pruebalog(event) {
    event.preventDefault()
    console.log(event);

  }
  showInfoContrato = false;
  radioDebito = false
  radioAdministracion = false
  radioCobrador = false
  constructor(public _productoService: ProductosService,
    public _usuarioService: UsuarioService, public readonly swalTargets: SwalPortalTargets,
    public _contratoService: ContratoService
  ) {
  }

  async ngOnInit() {
    let date = new Date()

    this.fechaMantenimiento = new Date(`${date.getFullYear() + 1}-01-05`)
    this.fechaMantenimiento.setUTCHours(5)

    console.log(this.fechaMantenimiento);

    this.productos = await this._productoService.getProductos()
    for (let i = 0; i < this.productos.length; i++) {
      const element = this.productos[i];
      if (element.COD_CORTO == 'C.M.P.') {
        this.servicioCMP = element
      }
    }
    console.log(this.servicioCMP);

    // this.clientes = await this._usuarioService.getClientes()
    // this.vendedores = await this._usuarioService.getVendedores()
    // this.cobradores = await this._usuarioService.getVendedores()

  }
  selectedDate
  calcularEdad(date) {
    console.log(date);

    if (date.length > 4) {
      let hoy = new Date()
      let fechaNacimiento = new Date(date)
      fechaNacimiento.setHours(5)
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
      let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--
      }
      console.log(edad);

      return edad
    } else return 0

  }

  beneficiarioPush() {
    this.beneficiarios.push(this.beneficiarioVacio)
  }

  inhumadoPush() {
    this.inhumados.push(this.inhumadoVacio)
  }

  calcularSaldo(entrega) {
    console.log(entrega);

    if (entrega) {
      this.saldo = this.producto.PRECIO_MAYORISTA - parseInt(entrega);
    } else {
      this.saldo = this.producto.PRECIO_MAYORISTA;
    }
  }

  calcularCuotas() {
    if (this.plazo > 0) {
      this.pagoradioValue = 'cuota'
      this.montoCuotas = this.saldo / this.plazo;
      this.facturas = this.crearFacturas(this.montoCuotas, this.plazo);
    } else {
      this.resetPlazo()
    }
  }
  resetPlazo() {
    this.plazo = null
    this.facturas = null;
    this.montoCuotas = null;
    this.pagoradioValue = 'contado'

  }
  calcularFechaPago() {

    let d = new Date(this.stringFechaPago);
    d.setUTCHours(5)

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
      } else {
        // date is valid
        this.fechaPago = d
        this.facturas = this.crearFacturas(this.montoCuotas, this.plazo);

      }
    } else {
      // not a date
    }
  }
  calcularFechaMantenimiento() {

    let d = new Date(this.stringFechaMantenimiento);
    d.setUTCHours(5)

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
      } else {
        // date is valid
        this.fechaMantenimiento = d
        // this.facturas = this.crearFacturas(this.montoCuotas, this.plazo);

      }
    } else {
      // not a date
    }
  }
  currencyInputChanged(value) {
    var num = value.replace(/[$,]/g, "");
    this.calcularSaldo(num)
    return Number(num);
  }
  async crearContrato() {
    // var d = new Date(),
    //   month = '' + (d.getMonth() + 1),
    //   day = '' + d.getDate(),
    //   year = d.getFullYear();

    // if (month.length < 2)
    //   month = '0' + month;
    // if (day.length < 2)
    //   day = '0' + day;

    // let today = [year, month, day].join('-');


    if (!this.facturas && this.pagoradioValue === 'contado') {
      this.plazo = 1
      this.facturas = this.crearFacturas(this.saldo, 1)
    }

    let nuevo_contrato: Contrato = {
      id_contrato: new Date().getTime().toString(),   // se puede quitar
      cobrador: this.cobrador || {},
      cuota: this.montoCuotas,
      entrega: this.entrega,
      id_servicio: this.producto.ID_PRODUCTO, // se puede quitar
      nombre_servicio: this.producto.NOMBRE,
      plazo: this.plazo,
      precio_total: this.producto.PRECIO_MAYORISTA,
      producto: this.producto,
      titular: this.cliente,
      nro_contrato: this.nro_contrato,
      activo: '1',
      vendedor: this.vendedor,
      beneficiarios: this.beneficiarios,
      // fecha_alta: today, // falta poner campode fecha para poder modificar
      fecha_creacion_unix: new Date().valueOf() // falta poner campode fecha para poder modificar

    }
    this.facturas.push({
      vencimiento: this.fechaMantenimiento,
      monto: 150000,
      haber: 150000,
      titular: this.cliente,
      iscmp: true,
      servicio: this.servicioCMP._id,
      fecha_creacion_unix: new Date().getTime()
    })
    console.log(this.facturas);
    let send = {
      contrato: nuevo_contrato,
      facturas: this.facturas
    }

    await this._contratoService.newContrato(send).then(() => {
      swal.fire({
        icon: 'success',
        title: 'Contrato creado',
        // text: 'I will close in 2 seconds.',
        timer: 2000,
      })
    });

  }
  async searchCobradores(val: any) {
    if (val.term.length > 0) {
      this.cobradores = await this._usuarioService.buscarUsuarios('COBRADORES', val.term)
    }
  }

  async searchClientes(val: any) {
    if (val.term.length > 0) {
      this.clientes = await this._usuarioService.buscarUsuarios('CLIENTES', val.term)

    }
  }

  async searchVendedores(val: any) {
    if (val.term.length > 0) {
      this.vendedores = await this._usuarioService.buscarUsuarios('VENDEDORES', val.term)
    }
  }

  onFocused(e) {
    // do something when input is focused
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.NOMBRES.toLowerCase().indexOf(term) > -1 ||
      item.APELLIDOS.toLowerCase().includes(term) ||
      item.RAZON.toLowerCase().includes(term) ||
      item.RUC.toLowerCase().includes(term);
  }


  seleccionarVendedor(vendedor) {
    this.vendedor = vendedor;
  }
  seleccionarProducto(producto: Producto) {
    this.beneficiarios = [
      {
        nombre: '',
        doc: '',
        fecha_nacimiento: '',
        edad: '',
        plus_edad: 0
      }
    ]

    this.inhumados = [
      this.inhumadoVacio
    ]
    if (this.cobrador) {
      this.radioValue = 'cobrador'
    }
    this.producto = producto;
    this.saldo = producto.PRECIO_MAYORISTA;
    if (producto.COD_CORTO == 'U.D.P.') {
      this.esUdp = true
    } else this.esUdp = false;
  }
  seleccionarCliente(cliente) {
    this.cliente = cliente;
  }
  seleccionarCobrador(cobrador) {
    this.cobrador = cobrador;
  }

  disableCrearContrato() {
    console.log("probando ");
    if (this.producto && this.cliente && this.vendedor && this.radioValue) {
      return false;
    }
    return true;
  }

  crearFacturas(monto, cantidad) {
    if (!cantidad) {
      return null;
    }
    let factura = []
    let mes = this.fechaPago.getMonth() + 1
    let year = this.fechaPago.getFullYear()
    let dia = this.fechaPago.getDate()
    for (let i = 0; i < cantidad; i++) {
      if (mes > 12) {
        year++;
        mes = 1;
      }
      factura.push({
        numero: i + 1,
        vencimiento: new Date(`${year}/${mes}/${dia}`),
        monto: monto,
        haber: monto,
        titular: this.cliente,
        servicio: this.producto._id,
        fecha_creacion_unix: new Date().getTime()
      })
      mes++;
    }
    return factura
  }

  facturaMantenimiento

  refactor() {
    this.producto = null;

  }

}
