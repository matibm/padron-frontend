import { Factura } from './../../models/factura';
import { FacturaService } from './../../services/factura.service';
import { ContratoService } from './../../services/contrato.service';
import { Contrato } from './../../models/contrato';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  constructor(public _facturaService: FacturaService) { }
  todos
  async ngOnInit() {
    // if (!this.facturas && !this.fromOutside) {
    //   let resp = await this._facturaService.getFacturas(this.pagado, this.fondo, this.start, this.end, null, null, this.cerrado)
    //   this.facturas = resp.facturas
    //   this.count = resp.count
    // } else {


    // }
  }
  page = 1
  @Input() fromOutside = false
  @Input() facturas: Factura[]
  @Input() count = 0
  @Input() pagado
  @Input() fondo
  @Input() start
  @Input() end
  @Input() cerrado 
  @Input() showlabel = true 
  async pageChanged(page) {
    console.log(page);
    
    let resp = await this._facturaService.getFacturas(this.pagado, this.fondo, this.start, this.end, page, null, this.cerrado)


    this.facturas = resp.facturas
    this.count = resp.count
    console.log(page);

  }

}
