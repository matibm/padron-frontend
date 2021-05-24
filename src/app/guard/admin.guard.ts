import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService,
    public router: Router
    ) {

  }
  async canActivate() {
    console.log("adminguard");
    
    if (this._usuarioService.usuario?.isadmin) {
      return true;
    } else{
      this.router.navigateByUrl('/login')
      return false
    }  
    return true
  }
  
}
