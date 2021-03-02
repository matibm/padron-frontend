import { Contrato } from './../../models/contrato';
import { ContratoService } from './../../services/contrato.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrato-pdf',
  templateUrl: './contrato-pdf.component.html',
  styleUrls: ['./contrato-pdf.component.css']
})
export class ContratoPdfComponent implements OnInit {


  constructor(
    public route: ActivatedRoute,
    private _contratoService: ContratoService
  ) { }
  id
  @Input() contrato: Contrato
  tipo_contrato = ''
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contrato = await this._contratoService.getContratoById(this.id)
    this.tipo_contrato = this.contrato.producto.COD_CORTO
     console.log(this.contrato);
     
  }

}
