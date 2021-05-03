import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, DoCheck, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, DoCheck {
  @ViewChildren("searchInput") search: QueryList<ElementRef>
  constructor(
    public _usuarioService: UsuarioService
  ) { }
  usuarios: Usuario[]
  public loading = false;

  async ngOnInit() {
    this.loading = true;

    this.usuarios = await this._usuarioService.getUsuarios();
    console.log(this.usuarios);
    this.loading = false;

  }


  ngDoCheck() {
    
    setTimeout(() => {
      if (this.search.length > 0) {
  
        this.search.first.nativeElement.focus();
      }  
      }, 0);
  }
searching 


  async searchUsuarios(val: any) {
 
    if (val.length > 0) {
      

      this.usuarios = await this._usuarioService.buscarUsuarios('ALL', this.searching)

    }
  }
}
