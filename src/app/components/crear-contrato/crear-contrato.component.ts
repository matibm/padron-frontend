import { Contrato } from '../../models/contrato';
import { Inhumado } from '../../models/unhumado';
import { ContratoService } from '../../services/contrato.service';
import { UsuarioService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/usuario';
import { Component, OnInit } from '@angular/core';
// import { Options } from 'select2';

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
  entrega
  producto: Producto
  saldo = 0
  vendedor: Usuario
  nro_contrato = ''
  cobrador: Usuario
  plazo: number
  paraNgmodel = 0
  contrato: Contrato
  montoCuotas  
  model = '2020-03-12'
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
  cuotas
  radioValue = 'administracion' 
  fechaPago = new Date()
  pagoradioValue = 'contado'
  stringFechaPago
  pruebalog(event) {
    event.preventDefault()
    console.log(event);

  }
  radioDebito = false
  radioAdministracion = false
  radioCobrador = false
  constructor(public _productoService: ProductosService,
    public _usuarioService: UsuarioService,
    public _contratoService: ContratoService
  ) { }

  async ngOnInit() {
    this.productos = await this._productoService.getProductos()
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
    this.paraNgmodel = entrega

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
      this.cuotas = this.crearCuotas(this.montoCuotas, this.plazo);
    }else{
      this.resetPlazo()
    }
  }
  resetPlazo(){
    this.plazo = null
    this.cuotas = null;
    this.montoCuotas = null;
    this.pagoradioValue = 'contado'

  }
  calcularFechaPago() {

    let d = new Date(this.stringFechaPago);
    d.setUTCHours(5)
    console.log(d);

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
      } else {
        // date is valid
        this.fechaPago = d
        this.cuotas = this.crearCuotas(this.montoCuotas, this.plazo);

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

    let nuevo_contrato: Contrato = {
      id_contrato: '34567',   // se puede quitar
      cobrador: this.cobrador,
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
    console.log(nuevo_contrato);


    await this._contratoService.newContrato(nuevo_contrato);

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
    return item.NOMBRES.toLowerCase().indexOf(term) > -1 || item.APELLIDOS.toLowerCase().includes(term) || item.RUC.toLowerCase().includes(term);
  }


  seleccionarVendedor(vendedor) {
    this.vendedor = vendedor;
  }
  seleccionarProducto(producto: Producto) {
    if (this.cobrador) {
      this.radioValue = 'cobrador'
    }
    this.producto = producto;
    this.saldo = producto.PRECIO_MAYORISTA;
    if (producto.COD_CORTO == 'U.D.P.') {
      this.esUdp = true
    }
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

  crearCuotas(monto, cantidad) {
    if (!cantidad) {
      return null;
    }
    let cuotas = []
    let mes = this.fechaPago.getMonth() + 1
    let year = this.fechaPago.getFullYear()
    let dia = this.fechaPago.getDate()
    for (let i = 0; i < cantidad; i++) {
      if (mes > 12) {
        year++;
        mes = 1;
      }
      cuotas.push({
        numero: i + 1,
        vencimiento: new Date(`${year}/${mes}/${dia}`),
        monto: monto
      })
      mes++;
    }
    return cuotas
  }

  

}
