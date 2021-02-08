import { MovimientoService } from './../../services/movimiento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  breadCrumb = []
  constructor(
    public _movimientoService: MovimientoService
  ) { }
  tipos_movimiento
  tipo
  async ngOnInit() {
    this.tipos_movimiento = await this._movimientoService.getTipoMovimiento(1)
  }

  async selectCategory(nombre, padre) {
    this.breadCrumb.push({ nombre: nombre, padre: padre })
    this.tipos_movimiento = await this._movimientoService.getTipoMovimiento(this.breadCrumb.length + 1, padre)

  }

}
