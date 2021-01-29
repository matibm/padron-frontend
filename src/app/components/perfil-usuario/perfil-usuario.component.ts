import { Contrato } from './../../models/contrato';
import { ContratoService } from './../../services/contrato.service';
import { Cuota } from './../../models/cuota';
import { CuotaService } from './../../services/cuota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(
    public _usuarioService: UsuarioService,
    public route: ActivatedRoute,
    public _cuotaService: CuotaService,
    public _contratoService: ContratoService
  ) { }
  id
  contratos: Contrato []
  usuario: Usuario
  cuotas: Cuota[]
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usuario = await this._usuarioService.getUsuarioPorId(this.id)
    this.cuotas = await this._cuotaService.getCuotaByTitular(this.id)
    this.contratos = await this._contratoService.getContratosByTitular(this.id);
  }

}
