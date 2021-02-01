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

  async ngOnInit() {
    this.usuarios = await this._usuarioService.getUsuarios();
    console.log(this.usuarios);

  }

}
