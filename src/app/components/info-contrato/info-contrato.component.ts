import { Contrato } from './../../models/contrato';
import { ActivatedRoute } from '@angular/router';
import { ContratoService } from './../../services/contrato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-contrato',
  templateUrl: './info-contrato.component.html',
  styleUrls: ['./info-contrato.component.css']
})
export class InfoContratoComponent implements OnInit {

  constructor(
    public _contratoService: ContratoService ,
    public activatedRoute:ActivatedRoute
  ) { }
  contrato: Contrato
  id
  cuotas
  esUdp
  cliente
  titular
  cobrador
  vendedor
  producto

  async ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.contrato = await this._contratoService.getContratoById(this.id)
    this.titular = this.contrato.titular
    this.cliente = this.contrato.titular
    this.producto = this.contrato.producto
    this.vendedor = this.contrato.vendedor
    this.cobrador = this.contrato.cobrador
    
  }

}
