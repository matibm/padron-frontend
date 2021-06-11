import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}
  async canActivate() {
    console.log('loginguard');

    if (this._usuarioService.usuario) {
      if (this._usuarioService.usuario.isadmin) {
        return true
      } else if (this._usuarioService.usuario.isreporte) {
        this.router.navigateByUrl('/reporte');
      }
      
      
    } else {
      console.log('login guard false');
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
