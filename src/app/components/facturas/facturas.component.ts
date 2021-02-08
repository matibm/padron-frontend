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
  
  async ngOnInit() {
    if (!this.facturas && !this.fromOutside) {
      let resp = await this._facturaService.getFacturas() 
      this.facturas = resp.facturas
      this.count = resp.count  
    }
  }
  page = 1
  count = 0
  @Input () fromOutside = false
  @Input () facturas: Factura[]

  async pageChanged(page) {
    let resp = await this._facturaService.getFacturas(page)


    this.facturas = resp.facturas
    this.count = resp.count
    console.log(page);

  }

}
