import { PersonaService } from './../../services/persona.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  constructor(
    private _usuarioService: UsuarioService,
    private _personaService: PersonaService
  ) { }
opciones: any = {}
persona
  async ngOnInit() {
    console.log(this._usuarioService.usuario);
    let usuario = this._usuarioService.usuario
    this.opciones.desc_dep = usuario.desc_dep
    this.opciones.desc_dis = usuario.desc_dis
    this.opciones.desc_locanr = usuario.desc_locanr
    this.opciones.desc_sec = usuario.desc_sec
    this.opciones.mesa = usuario.mesa

    let personas = await this._personaService.getPersonas(this.opciones)
    console.log(personas);
    
  }


  async buscar(busqueda, tipo){
    let resultado 
    if (tipo === 'ci') {
      this.opciones.numero_ced = busqueda
      resultado = await this._personaService.getPersonas(this.opciones)      
    }else if(tipo === 'orden'){
      this.opciones.orden = busqueda

      resultado = await this._personaService.getPersonas(this.opciones)
    }
    console.table(resultado);
    this.persona = resultado[0]
  }

  async votar(cedula){  
    await this._personaService.votar(cedula)
    this.persona = null
  } 

}


