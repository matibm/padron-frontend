import { ActivatedRoute } from '@angular/router';
import { Inhumado } from './../../models/unhumado';
import { Contrato } from './../../models/contrato';
import { Producto } from './../../models/producto';
import { Usuario } from './../../models/usuario';
import { ContratoService } from './../../services/contrato.service';
import { UsuarioService } from './../../services/usuario.service';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { SwalPortalTargets, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent implements OnInit {

  constructor(
    public _productoService: ProductosService,
    public _usuarioService: UsuarioService,
    public readonly swalTargets: SwalPortalTargets,
    public _contratoService: ContratoService,
    public route: ActivatedRoute,

  ) { }
  opacity = 'disable'
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
  manzana
  fila
  parcela
  sector
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
  inhumados: Inhumado[] 
  facturas
  radioValue = 'administracion'
  fechaPago = new Date()
  pagoradioValue = 'contado'
  stringFechaPago
  servicioCMP
  numeroFactura
  editarproducto = false
  respaldoProducto
  id
  async ngOnInit() {
    let date = new Date()

    this.id = this.route.snapshot.paramMap.get('id');
    this.contrato = await this._contratoService.getContratoById(this.id)
  //log(this.contrato);
    this.saldo = this.contrato.saldo_pendiente
    this.inhumados = this.contrato.inhumados
    this.vendedor = this.contrato.vendedor
    this.cobrador = this.contrato.cobrador
    this.seleccionarProducto(this.contrato.producto)
    this.fechaMantenimiento = new Date(`${date.getFullYear() + 1}-01-05`).setHours(24)
    
    
    this.cliente = this.contrato.titular

    this.productos = await this._productoService.getProductos()
    for (let i = 0; i < this.productos.length; i++) {
      const element = this.productos[i];
      if (element.COD_CORTO == 'C.M.P.') {
        this.servicioCMP = element
      }
    }
  }

  calcularEdad(date) {
 
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
 
      return edad
    } else return 0

  }

  beneficiarioPush() {
    this.contrato.beneficiarios.push({
      nombre: '',
      doc: '',
      fecha_nacimiento: '',
       plus_edad: 0
    })
  }

  inhumadoPush() {
    this.contrato.inhumados.push( {
      fecha_fallecimiento: '',
      fecha_inhumacion: '',
      nombre: '',
      ci: '',
  
    })
  }

  calcularSaldo(entrega) {
  //log(entrega);

    if (entrega) {
      // this.saldo = this.producto.PRECIO_MAYORISTA - parseInt(entrega);
    } else {
      // this.saldo = this.producto.PRECIO_MAYORISTA;
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
   

    if (!this.facturas && this.pagoradioValue === 'contado') {
      this.plazo = 1
      this.facturas = this.crearFacturas(this.contrato.saldo_pendiente, 1)
    }

    
      this.contrato.id_contrato = new Date().getTime().toString(),   // se puede quitar
      this.contrato.cobrador = this.cobrador || {},
      this.contrato.cuota = this.montoCuotas,
      this.contrato.entrega = this.entrega,
      this.contrato.id_servicio = this.producto.ID_PRODUCTO, // se puede quitar
      this.contrato.nombre_servicio = this.producto.NOMBRE,
      this.contrato.plazo = this.plazo,
      this.contrato.precio_total = this.producto.PRECIO_MAYORISTA,
      this.contrato.producto = this.producto,
      this.contrato.titular = this.cliente,
      this.contrato.nro_contrato = this.nro_contrato,
      this.contrato.activo = '1',
      this.contrato.vendedor = this.vendedor,
       this.contrato.fecha_creacion_unix = new Date().valueOf() // falta poner campode fecha para poder modificar
 
    
    if (this.esUdp) {
      this.contrato.manzana = this.manzana
      this.contrato.fila = this.fila
      this.contrato.parcela = this.parcela
      this.contrato.sector = this.sector
    }else{
      this.contrato.manzana = null
      this.contrato.fila = null
      this.contrato.parcela = null
      this.contrato.sector = null
    }
    if (this.editarproducto && this.esUdp) {
      this.facturas.push({
        vencimiento: this.fechaMantenimiento,
        monto: 150000,
        haber: 150000,
        titular: this.cliente,
        iscmp: true,
        servicio: this.servicioCMP._id,
        fecha_creacion_unix: new Date().getTime()
      })
    }
  //log(this.facturas);
    let send = {
      contrato: this.contrato,
      facturas: this.facturas
    }

    await this._contratoService.updateContrato(send, this.editarproducto).then(() => {
      swal.fire({
        icon: 'success',
        title: 'Contrato actualizado',
        // text: 'I will close in 2 seconds.',
        timer: 2000,
      })
    });
    window.history.back()
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
      {
        fecha_fallecimiento: '',
        fecha_inhumacion: '',
        nombre: '',
        ci: '',
    
      }
    ]
    if (this.cobrador) {
      this.radioValue = 'cobrador'
    }
    this.producto = producto;
    // this.saldo = producto.PRECIO_MAYORISTA;
    if (producto.COD_CORTO == 'U.D.P.') {
      this.esUdp = true
    } else this.esUdp = false;
    this.respaldoProducto = this.producto
  }
  seleccionarCliente(cliente) {
    this.cliente = cliente;
  }
  seleccionarCobrador(cobrador) {
    this.cobrador = cobrador;
  }

  disableCrearContrato() {
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

  cancelarEdiciondeProducto() {
    this.editarproducto = false
    this.producto = this.respaldoProducto
  }

  editarProducto() {
    swal.fire({
      icon: 'warning',
      title: 'Modificar Producto',
      text: 'Si modifica se eliminarán todas las facturas correspondientes al contrato',
      showCancelButton: true,
      cancelButtonText: 'cancelar',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'modificar',
      confirmButtonColor: '#06d79c',
      showConfirmButton: true
    }).then(res => {

      if (res.isConfirmed == true) {
        this.editarproducto = true
      } else {

      }
    })
  }
 

}
