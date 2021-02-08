import { Factura } from '../../models/factura';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute } from '@angular/router';
import { CuotaService } from '../../services/cuota.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public _cuotaService: CuotaService,
    public _facturaService: FacturaService
  ) { }
  id
  factura: Factura
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.factura = await this._facturaService.getFacturaById(this.id) 
    }
  }

  async pagar() {
    let any: any = this.factura    
    let factura: Factura = any
    await this._facturaService.pagarFactura(factura)
  }
}
