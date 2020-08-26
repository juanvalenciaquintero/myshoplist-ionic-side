import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//mport { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private url = 'http://estadisticas.dx.am';
  private url = 'http://juanvalencia.x10host.com/api';
  // private url = 'http://myshoplist.is-best.net';

  constructor(public http: HttpClient)
  {
    console.log('Entrado en servicio');
  }

  checkArt(articulo:string)
  {
    let path = this.url + '/articulo/checkArt/' + articulo;
    return this.http.get(path);
  }

  addArticle(articulo: any)
  {
    const path = this.url + '/articulo/addArticle/' + articulo;
    console.log(path);
    return this.http.get(path);
    // const path = this.url +'/myshoplist.php';
    // let param =
    // {
    //   'action': 'insert',
    //   'artic' : articulo
    // }
    // return new Promise(resolve => {
    //   this.http.post(path,param)
    //     .subscribe(data =>
    //     {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });
  }

  addArticleDesp(articulo)
  {
      let path = this.url + '/articulo/addToList/' + articulo;
      return this.http.get(path);
    // const path = this.url +'/articulo/addToList/'+articulo;
    // let param =
    // {
    //   'action': 'insertDesp',
    //   'artic' : articulo
    // }

    // return new Promise(resolve => {
    //   this.http.post(path,param)
    //     .subscribe(data =>
    //     {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });

  }


  getAllArticles()
  {
    //  const path =this.url +'/myshoplist.php?valor=1';
    let path = this.url + '/articulo/articulos';
          return this.http.get(path);
    // return new Promise(resolve => {
    //   this.http.get(path )
    //     .subscribe(data =>
    //     {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });
    // const path = '/myshoplist.php?valor=1';
    // return this.http.get<Article[]>(path);
  }

  getAllArticlesPurchased()
  {
    let path = this.url + '/articulo/articulosCompr';
    //  const path = this.url +'/myshoplist.php?valor=2';
    // return this.http.get<Article[]>(path);
    return this.http.get(path);
    // return new Promise(resolve => {
    //   this.http.get(path)
    //     .subscribe(data =>
    //     {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });
  }

  updateArticle(articulo: number, usuario:number)
  {
    // const path = this.url + '/myshoplist.php';
    let path = this.url + '/articulo/itemPurchased';
    console.log(articulo);
    let param =
    {
      'id_articulo'  : articulo,
      'usuario': usuario
    }
    return new Promise(resolve =>
    {
      this.http.post(path,param)
        .subscribe(data =>
      {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteArticles()
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action': 'delete',
      'artic' : 'comprados'
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
    //return this.http.post(path, param, this.httpOptions);
  }

  getAllArticlesDespensa()
  {
    // const path = '/myshoplist.php?valor=2';
    // return this.http.get<Article[]>(path);
    let path = this.url + '/despensa';
    return new Promise(resolve => {
      this.http.get(path)
        .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getArticleDespensa(article)
  {
    return this.http.get(this.url + '/myshoplist.php?valor=5&id=' + article);
  }

  returnItemPurchased(articulo: number)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action': 'updatePurchased',
      'artic' : articulo
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteArtUnic(articulo: number)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action': 'deleteArtUnic',
      'artic' : articulo
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }


  deleteArticleDespensa(articulo: number)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action': 'deleteArtDespensa',
      'artic' : articulo
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  actualizar(articulo)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action': 'updateArtUnic',
      'artic' : articulo
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  checklogin(usuario,password)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action'  : 'checkLogin',
      'usuario': usuario,
      'password' : password
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  checkUser(id)
  {
    return this.http.get(this.url + '/myshoplist.php?valor=6&id=' + id);
  }

  updateUser(user)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action'  : 'updateUser',
      'usuario': user
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  updatePass(user, pass)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action'  : 'updatePass',
      'usuario': user,
      'password' : pass
    }
    return new Promise(resolve =>
      {
        this.http.post(path, param)
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  nuevoArt(articulo)
  {
    const path = this.url +'/myshoplist.php';
    let param =
    {
      'action': 'nuevoArtDesp',
      'artic' : articulo
    }
    return new Promise(resolve => {
      this.http.post(path,param)
        .subscribe(data =>
        {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  checkLists()
  {
    return this.http.get(this.url + '/myshoplist.php?valor=7');
  }

  checkNew(articulo)
  {
    let path = 'http://juanvalencia.x10host.com/articulo/addArticle/';
    return this.http.get(path + articulo);
  }

  getArticlesHistory(fecha)
  {
     return this.http.get(this.url + '/myshoplist.php?valor=8&fecha=' + fecha);
  }

  test()
  {
    return this.http.get('http://juanvalencia.x10host.com/test');
  }
}
