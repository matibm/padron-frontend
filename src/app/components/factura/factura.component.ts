import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Factura } from '../../models/factura';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CuotaService } from '../../services/cuota.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

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
    public _usuarioService: UsuarioService,
    public router: Router,

  ) { }
  fondo: Usuario
  fondos: Usuario[]
  id
  factura: Factura
  crearParcial = false
  primeraEjecucion = true
  montoparcial = 0
  montoparcialCorrecto = true
  parciales: Factura[]  
  async ngOnInit() {
    if (this.primeraEjecucion) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
        this.ngOnInit()

      });
      this.primeraEjecucion = false
    }


    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.initialize()

  }

  async initialize() {
    this.fondo = null;

    if (this.id) {
      this.factura = await this._facturaService.getFacturaById(this.id)
      this.parciales = (await this._facturaService.getFacturasParcial(this.id)).facturas
      if (this.factura.pagado) {
        this.fondo = this.factura.fondo
      }

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
    factura.fondo = this.fondo
    if (this.crearParcial && this.montoparcial > 0) {
      await this._facturaService.pagarFactura(factura, true, this.montoparcial)
    } else {
      await this._facturaService.pagarFactura(factura)

    }
  }
  async searchBancos(val) {
    this.fondos = await this._usuarioService.buscarUsuarios('BANCOS', val.term)
  }

  verificarMontoParcial(monto) {
    if (monto > this.factura.haber && monto > 0) {
      this.montoparcialCorrecto = false
    } else {
      this.montoparcialCorrecto = true

    }
  }

}
