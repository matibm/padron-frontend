import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

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
searching 


  async searchUsuarios(val: any) {
 
    if (val.length > 0) {
      

      this.usuarios = await this._usuarioService.buscarUsuarios('ALL', this.searching)

    }
  }
}
