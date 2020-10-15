import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  remember: boolean;
  authorized: boolean;
  logged: boolean;

  constructor(private storageService:StorageService) { }

  public checkRemember()
  {
    console.log('Entrado en auth.service');
    console.log(this.storageService.getLocal('loginRemember'));
    this.remember = this.storageService.getLocal('loginRemember');
    this.authorized = this.storageService.getLocal('authorized');
    if ((this.remember) || (this.authorized))
    {
      return true;
    }
    else
    {
      console.log('Salido de auth.service');
      return false;
    }
  }

  public checkLogged()
  {

    this.logged = this.storageService.getLocal('logged');
    console.log(this.logged);
    if (this.logged)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public desloguear()
  {
    this.storageService.setLocal('logged', false);
    this.storageService.setLocal('userId',0);
    return true;
  }
}
