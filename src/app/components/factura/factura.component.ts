import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
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
    public _facturaService: FacturaService,
    public _usuarioService: UsuarioService
  ) { }
  fondo: Usuario
  fondos: Usuario[]
  id
  factura: Factura
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.factura = await this._facturaService.getFacturaById(this.id) 
      console.log(this.factura);
    this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', '')
      
    }
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.NOMBRES.toLowerCase().indexOf(term) > -1 ||
      item.APELLIDOS.toLowerCase().includes(term) ||
      item.RAZON.toLowerCase().includes(term) ||
      item.RUC.toLowerCase().includes(term);
  }

  async pagar() {
    let any: any = this.factura    
    let factura: Factura = any
    await this._facturaService.pagarFactura(factura)
  }
  async searchBancos(val) {
    this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', val.term)
  }
}
