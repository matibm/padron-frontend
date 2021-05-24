import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  async login(email, password) {
    let usuario = {
      email: email,
      password: password
    }
    let resp = await this._usuarioService.login(usuario);
    if (resp.ok == true) {
      localStorage.setItem('token', resp.token);
      localStorage.setItem('id', resp.user_id);
      localStorage.setItem('usuario', JSON.stringify(resp.user));
      this._usuarioService.token = resp.token
      this._usuarioService.itsLogued = true
      this._usuarioService.usuario = resp.user
      if (resp.user.isadmin) {
        this.router.navigateByUrl('/')                
      } else if(resp.user.isreporte) {
        this.router.navigateByUrl('/personas')                        
      
      } else if(resp.user.ismesa) {
        this.router.navigateByUrl('/mesa')                

      }

    }
  }

}
