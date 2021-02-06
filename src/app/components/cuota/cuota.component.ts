import { Factura } from './../../models/factura';
import { FacturaService } from './../../services/factura.service';
import { Cuota } from './../../models/cuota';
import { ActivatedRoute } from '@angular/router';
import { CuotaService } from './../../services/cuota.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuota',
  templateUrl: './cuota.component.html',
  styleUrls: ['./cuota.component.css']
})
export class CuotaComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public _cuotaService: CuotaService,
    public _facturaService: FacturaService
  ) { }
  id
  cuota: Cuota
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.cuota = await this._cuotaService.getCuotaById(this.id) 
    }
  }

  async pagar() {
    let any: any = this.cuota
    console.log(this.cuota);
    
    let factura: Factura = any
    factura.cuota_correspondiente_id = this.cuota._id
    await this._facturaService.crearFactura(factura)
  }
}
