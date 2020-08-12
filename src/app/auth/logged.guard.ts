import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate
{
  constructor(private authService: AuthService, private router: Router) { }

  canActivate()
  {
    console.log('--Entrado en LoggedGuard');
    if (this.authService.checkLogged())
    {
      return true;
    } else
    {
      console.log('Redireccion a login');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
