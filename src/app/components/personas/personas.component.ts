import { PersonaService } from './../../services/persona.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(
    public _personaService: PersonaService
  ) { }
  departamentos  
  distritoSeleccionado
  seccionalSeleccionado
  seccionales  
  localSeleccionado
  locales 
  distritos  
  opciones: any = {nombre: ''}
  dptoSeleccionado
  async ngOnInit() {
    this.departamentos = await this._personaService.getLista(this.opciones, 'desc_dep') 
    this.distritos = await this._personaService.getLista(this.opciones, 'desc_dis') 
    this.seccionales = await this._personaService.getLista(this.opciones, 'desc_sec') 
    this.locales = await this._personaService.getLista(this.opciones, 'desc_locanr') 
  }
  change(item) {
    console.log(item);

    this.opciones.desc_dep = item
  }

  filtrar() {
    console.log(this.opciones);

    this._personaService.getExcel(this.opciones).subscribe( (data:any) =>{
      console.log(data);
      const url= window.URL.createObjectURL(data);
      window.open(url);
    })

  }

}
