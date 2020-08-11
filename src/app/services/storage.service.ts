import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class StorageService
{
  constructor()
  {
  }


  public clearSession(): void
  {
    localStorage.clear();
  }


  public removeSession(key: string): void
  {
    localStorage.removeItem(key);
  }


  public getSession(key: string): any
  {
    return JSON.parse(sessionStorage.getItem(key));
  }


  public setSession(key: string, data: Object): void
  {
    sessionStorage.setItem(key, JSON.stringify(data));
  }


  public clearLocal(): void
  {
    localStorage.clear();
  }


  public removeLocal(key: string): void
  {
    localStorage.removeItem(key);
  }


  public getLocal(key: string): any
  {
    return JSON.parse(localStorage.getItem(key));
  }


  public setLocal(key: string, data: Object): void
  {
    console.log(key + ' - ' + data);
    localStorage.setItem(key, JSON.stringify(data));
  }


}
