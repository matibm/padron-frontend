import { Movimiento } from './../../models/movimiento';
import { MovimientoService } from './../../services/movimiento.service';
import { Factura } from './../../models/factura';
import { FacturaService } from './../../services/factura.service';
import { Contrato } from './../../models/contrato';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from './../../services/contrato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-contrato',
  templateUrl: './info-contrato.component.html',
  styleUrls: ['./info-contrato.component.css']
})
export class InfoContratoComponent implements OnInit {

  constructor(
    public _contratoService: ContratoService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public _facturaService: FacturaService,
    public _movimientoService: MovimientoService

  ) { }
  contrato: Contrato
  id
  facturas: Factura[]
  esUdp
  cliente
  titular
  cobrador
  movimientos: Movimiento[]
  vendedor
  producto
  titularAlternativo

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.contrato = await this._contratoService.getContratoById(this.id)
    console.log(this.contrato);

    this.titular = this.contrato.titular
    this.cliente = this.contrato.titular
    this.producto = this.contrato.producto
    this.vendedor = this.contrato.vendedor
    this.cobrador = this.contrato.cobrador
    this.titularAlternativo = this.contrato.titular_alternativo
    this.facturas = await this._facturaService.getFacturasByContrato(this.contrato._id)
    this.movimientos = (await this._movimientoService.getAllMovimientos({ contrato: this.contrato._id })).movimientos
  }

  viewContrato() {
    let wopen = window.open('/contratos-pdf/' + this.id)
    wopen.onafterprint = (event) => {
      wopen.close()
    }
  }

  crearMovimiento() {
    localStorage.setItem('movimiento_contrato', JSON.stringify(this.contrato))
    localStorage.setItem('crear_movimiento', 'true')
    this.router.navigateByUrl('/admin/movimientos')
  }

}
