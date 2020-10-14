import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isError } from 'util';
//mport { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private url = 'http://estadisticas.dx.am';
  private url = 'http://juanvalencia.x10host.com/api';
  private authUrl = 'http://juanvalencia.x10host.com/auth';
  // private url = 'http://myshoplist.is-best.net';
  headers = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "*")
    .set("Access-Control-Request-Headers", "Access-Control-Allow-Origin, Content-Type, Accept, Access-Control-Request-Method, Authorization")
    .set("Access-Control-Request-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    .set("Content-Type", "multipart/form-data");


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
    return this.http.get(path);
  }

  addArticleDesp(articulo)
  {
      let path = this.url + '/articulo/addToList/' + articulo;
      return this.http.get(path);
  }


  getAllArticles()
  {
    let path = this.url + '/articulo/articulos';
    return this.http.get(path);
  }

  getAllArticlesPurchased()
  {
    let path = this.url + '/articulo/articulosCompr';
    return this.http.get(path);
  }

  updateArticle(articulo: number,cantidad:number, usuario:number)
  {
    let path = this.url + '/articulo/itemPurchased/' +articulo + '/' + cantidad + '/' + usuario ;
    console.log(path);
    return this.http.get(path);
  }

  deleteArticles()
  {
    let path = this.url + '/articulo/deleteArticles';
    return this.http.get(path);
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
    let path = this.url + '/despensa/getArticleDespensa/' + article;
    return this.http.get(path);

  }

  returnItemPurchased(articulo: number)
  {
    let path = this.url + '/articulo/returnItem/' +articulo ;
    return this.http.get(path);
  }

  deleteArtUnic(articulo: number)
  {
    const path = this.url +'/articulo/deleteItem/' + articulo;
    return this.http.get(path);
  }


  deleteArticleDespensa(articulo: number)
  {
    const path = this.url +'/despensa/deleteArt/' + articulo;
    return this.http.get(path);
    // let param =
    // {
    //   'action': 'deleteArtDespensa',
    //   'artic' : articulo
    // }
    // return new Promise(resolve =>
    //   {
    //     this.http.post(path, param)
    //       .subscribe(data =>
    //     {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });
  }

  actualizar(articulo)
  {
    const path =this.url + '/despensa/actualizar';
    let param =
    {
      'id': articulo.id,
      'name': articulo.name,
      'brand': articulo.brand,
      'supermarket': articulo.supermarket,
      'price': articulo.price,
      'fecha_desp': articulo.fecha_desp,
      'pasillo': articulo.pasillo,
      'categoria':articulo.categoria
    }
    return new Promise(resolve =>
      {
      this.http.post(path, param, { responseType: 'json' })
          .subscribe(data =>
        {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  actualizarQtty(articulo,cantidad)
  {
    const path =this.url + '/articulo/actualizarQtty';
    let param =
    {
      'id': articulo,
      'cantidad':cantidad
    }
    return new Promise(resolve =>
      {
      this.http.post(path, param, { responseType: 'json' })
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
    const path = this.authUrl +'/checkLogin';
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
    return this.http.get(this.url + '/usuario/show/' +id);
    // return this.http.get(this.url + '/myshoplist.php?valor=6&id=' + id);
  }

  createUser(nombre,pass)
  {
    const path = this.url +'/usuario/nuevo';
    let param =
    {
      'nombre': nombre,
      'pass': pass
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

  updateUser(user)
  {
    // const path = this.url + '/myshoplist.php';
    const path = this.url +'/usuario/actualizar';
    let param =
    {
      'id'  : user.id,
      'name': user.nombre
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

  nuevoArtDesp(articulo)
  {
    const path =this.url + '/despensa/nuevoArt';
    let param =
    {
      'name': articulo.name,
      'brand': articulo.brand,
      'supermarket': articulo.supermarket,
      'price': articulo.price,
      'fecha_desp': articulo.fecha_desp,
      'pasillo': articulo.pasillo,
      'categoria':articulo.categoria
    }
    return new Promise(resolve =>
      {
      this.http.post(path, param, { responseType: 'json' })
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
    // return this.http.get(this.url + '/myshoplist.php?valor=7');
    return this.http.get(this.url + '/lista/listasHistorico');
  }

  checkNew(articulo)
  {
    // let path = 'http://juanvalencia.x10host.com/articulo/addArticle/';
    return this.http.get(this.url + 'articulo/addArticle/' + articulo);
  }

  getArticlesHistory(fecha)
  {
     return this.http.get(this.url + '/myshoplist.php?valor=8&fecha=' + fecha);
  }

  // test()
  // {
  //   return this.http.get('http://juanvalencia.x10host.com/test');
  // }

  getCategories()
  {
   let path = this.url + '/despensa/getCategories';
   return this.http.get(path);

  }
}
