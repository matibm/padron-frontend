import { PersonaService } from './../../services/persona.service';
import { UsuarioP } from './../../models/usuariop';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component,  ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { of } from "rxjs";

import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild("searchInput", { static: true }) search: ElementRef
  @ViewChildren("searchInput") searchInput: QueryList<ElementRef>
  constructor(
    public _usuarioService: UsuarioService,
    public _personaService: PersonaService


  ) { }
  usuarios: UsuarioP[]
  public loading = false;
  opciones: any = {}
  candidato
  candidatos










  async ngOnInit() {
    this.loading = true;


    this.getlistas()

    // this.usuarios = await this._usuarioService.getUsuarios();
    this.loading = false;

    this.usuarios = await this._usuarioService.getUsuariosP(this.opciones)
    console.log(this.usuarios);

    // elem ref
    const searchBox = document.getElementById('search');

    // streams
    const keyup$ = fromEvent(searchBox, 'keyup');

    // wait .5s between keyups to emit current value
    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(700),
        distinctUntilChanged()

      )
      .subscribe(async (txt) => {
        console.log("text",txt);
        
        this.isSearching = true
        this.usuarios = await this._usuarioService.buscarCandidatos(txt, this.opciones)
        this.isSearching = false
      });

  }

  isSearching = false;
  apiResponse = [];

  rebuscar(toOmit: Array<string>) {
    for (let i = 0; i < toOmit.length; i++) {
      const element = toOmit[i];
      this.opciones[element] = null
    }
    console.log(this.opciones);

    this.getlistas()

  }

  departamentos
  distritos
  seccionales
  locales
  
  async getlistas() {

    this.departamentos = await this._personaService.getLista(this.opciones, 'desc_dep')
    this.distritos = await this._personaService.getLista(this.opciones, 'desc_dis')
    this.seccionales = await this._personaService.getLista(this.opciones, 'desc_sec')
    this.locales = await this._personaService.getLista(this.opciones, 'desc_locanr')
    this.usuarios = await this._usuarioService.getUsuariosP(this.opciones)
    
  }
 
  searching
 
}
