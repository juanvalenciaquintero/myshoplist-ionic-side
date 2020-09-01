import { Articulo } from './../interfaces/articulo';
import { Component, OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { TaskService } from './../task.service';
import { Platform } from '@ionic/angular';
import { StorageService } from './../services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss','./../app.component.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  articulos: any;
  articulosComp: any;
  lista: string[];
  visible = false;
  backButtonSubscription;
  usuario: number;
  articulo: Articulo;
  constructor(public storageService: StorageService,public taskService: TaskService,private platform: Platform)
  {
    this.test();
    //this.checkNew();
    this.getAllArticles();
    this.getAllArticlesPurchased();
  }

  ngOnInit()
  {
    // this.storageService.setLocal('userId', '');
    // this.storageService.setLocal('logged', false);

    console.log(this.storageService.getLocal('logged'));
    console.log(this.storageService.getLocal('userId'));
    this.usuario = this.storageService.getLocal('userId');

  }

  test()
  {
   this.taskService.test()
      .subscribe(data =>
      {
        console.log(data);

      });
  }


  checkArt(event: any): void
  {
    let articulo = event.target.value;
    let listaArt: any = [];
    let datos: any;
    // setTimeout(function ()
    // {
      //console.log(articulo);
      if (articulo.length > 3)
      {
        this.taskService.checkArt(articulo)
        .subscribe(data =>
        {
            datos = data;
            console.log(data);
            if (data !== 0)
            {
              console.log(datos.length);
              for (var i = 0; i < datos.length; i++)
              {
                listaArt.push(datos[i]);
                }
              this.visible = true;
            } else
            {
              this.visible = false;
            }
          });
    }
    this.lista = listaArt;
    // }, 200);
  }

  selectArt(event:any)
  {
    let seleccionado = <HTMLInputElement>document.getElementById('artic');
    seleccionado.value = event.target.innerHTML;
    seleccionado.value = seleccionado.value.trim();
    console.log(seleccionado.value);
    this.addArticleDesp();
    this.visible = false;
  }

  addArticleDesp()
  {
    let artId: number;
    var id: any;
    let seleccionado = <HTMLInputElement>document.getElementById('artic');
    console.log('addArticleDesp:' +  seleccionado.value);
    this.taskService.addArticleDesp(seleccionado.value)
      .subscribe(data =>
      {
        this.getAllArticles();
        this.getAllArticlesPurchased();
    });
  }

  addArt(articulo:number): void
  {
    console.log('Añadir a la lista artículo:' + articulo);
    this.taskService.addArticle(articulo)
      .subscribe(data =>
      {
        this.getAllArticles();
        this.getAllArticlesPurchased();
      });

  }

  getAllArticles() {
    this.taskService.getAllArticles()
    .subscribe(data => {
      this.articulos = data;
      console.log(this.articulos);
    });

  }

  getAllArticlesPurchased() {
    this.taskService.getAllArticlesPurchased()
    .subscribe(data => {
      this.articulosComp = data;
      console.log(this.articulosComp);
    });
  }

  itemPurchased(articulo)
  {
    console.log('Home.page.ts: ' + articulo + ' - ' + this.usuario);
    this.taskService.updateArticle(articulo,this.usuario)
      .subscribe(data =>
      {
        console.log(data);
        this.getAllArticles();
        this.getAllArticlesPurchased();
      });
  }

  deleteArt()
  {
    this.taskService.deleteArticles()
    .then(data => {
      this.getAllArticles();
      this.getAllArticlesPurchased();
    });
  }

  deleteArtUnic(articulo,nombre)
  {
    if (confirm("¿Quieres eliminar '" + nombre + "' de la lista?"))
    {
      this.taskService.deleteArtUnic(articulo)
        .then(data =>
        {
          this.getAllArticles();
          this.getAllArticlesPurchased();
        });
    };
  }

  returnItemPurchased(articulo)
  {
    console.log('Anular: ' + articulo);
    this.taskService.returnItemPurchased(articulo)
    .then(data => {
      this.getAllArticles();
      this.getAllArticlesPurchased();
    });
  }


  ngAfterViewInit()
  {
    this.backButtonSubscription = this.platform.backButton.subscribe(()=>
    {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy()
  {
    this.backButtonSubscription.unsubscribe();
  }

  doRefresh(event)
  {
    this.getAllArticles();
    this.getAllArticlesPurchased();

  }
  checkNew()
  {
    this.taskService.checkNew(1)
      .subscribe(data =>
      {
        console.log(data);
      });
  }
}
