import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  nombres
  apellidos
  telefono
  email 
  password
  crearUsuario(){
    let usuario: Usuario = {
      NOMBRES: this.nombres,
      APELLIDOS: this.apellidos,
      TELEFONO1: this.telefono,
      EMAIL: this.email,
      password: this.password
    }  
    console.log(usuario);
    
    this._usuarioService.crearUsuario(usuario)

  }

}
