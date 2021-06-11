import { UsuarioService } from './../../services/usuario.service';
import { PersonaService } from './../../services/persona.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(
    public _personaService: PersonaService,
    public _usuarioService: UsuarioService

  ) { this.usuario = _usuarioService.usuario }
  usuario
  departamentos
  distritoSeleccionado
  seccionalSeleccionado
  seccionales
  localSeleccionado
  locales
  distritos
  opciones: any = { nombre: '' }
  dptoSeleccionado
  async ngOnInit() {
    console.log(this.usuario);

    this.dptoSeleccionado = this.usuario.desc_dep
    this.distritoSeleccionado = this.usuario.desc_dis
    this.seccionalSeleccionado = this.usuario.desc_sec
    this.localSeleccionado = this.usuario.desc_locanr

    this.opciones.desc_dep = this.dptoSeleccionado
    this.opciones.desc_dis = this.distritoSeleccionado
    this.opciones.desc_sec = this.seccionalSeleccionado
    this.opciones.desc_locanr = this.localSeleccionado

    this.getlistas()
  }
  change(item) {
    console.log(item);

    this.opciones.desc_dep = item
  }

  filtrar() {
    console.log(this.opciones);

    this._personaService.getExcel(this.opciones).subscribe((data: any) => {
      swal.fire({
        icon:'success',
        title: 'Reporte generado correctamente',
        text: 'revise en la carpeta de descargas'
      })
      console.log(data);
      const url = window.URL.createObjectURL(data);
      window.open(url);
    },
    (error)=>{
      console.log(error);
      
      swal.fire({
        icon:'error',
        title: 'Ocurrió un error',
        text: 'Por favor contáctanos para informar sobre el problema'
      })
    }
    )
  }

  rebuscar( toOmit: Array<string>){
     for (let i = 0; i < toOmit.length; i++) {
      const element = toOmit[i];
      this.opciones[element] = null      
    }
    console.log(this.opciones);
    
    this.getlistas()

  }

  async getlistas(){

    this.departamentos = await this._personaService.getLista(this.opciones, 'desc_dep')
    this.distritos = await this._personaService.getLista(this.opciones, 'desc_dis')
    this.seccionales = await this._personaService.getLista(this.opciones, 'desc_sec')
    this.locales = await this._personaService.getLista(this.opciones, 'desc_locanr')

  }

  back(){
    window.location.reload()
  }

}
