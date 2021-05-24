import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService,
    public router: Router
    ) {

  }
 async canActivate() {
    console.log('reporteguard');
     
    if (this._usuarioService.usuario?.isreporte) {
      return true;
    } else{
      this.router.navigateByUrl('/login')
      return false
    }  
    

    return true
  }
  
}
