import { ContratoService } from './../../services/contrato.service';
import { Contrato } from './../../models/contrato';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.css']
})
export class ListaContratosComponent implements OnInit {

  constructor(public _contratoService: ContratoService) { }
  page = 1 
  async ngOnInit() {
    let resp = await this._contratoService.getContratos()
    
    
    this.contratos = resp.contratos
    this.count = resp.count
  }
  count = 0
  @Input() contratos: Contrato[]

  async pageChanged(page){
    let resp = await this._contratoService.getContratos(page)
    
    
    this.contratos = resp.contratos
    this.count = resp.count
    console.log(page);
    
  }
}
