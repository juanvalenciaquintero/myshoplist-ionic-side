import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { StorageService } from './../services/storage.service';
import { TaskService } from './../task.service';

@Component({
  selector: 'app-despensa',
  templateUrl: './despensa.page.html',
  styleUrls: ['./despensa.page.scss', './../app.component.scss'],
})
export class DespensaPage implements OnInit
{

  backButtonSubscription;
  @Input() articulosDespensa: any;
  categorias: any = [];
  usuario: number;

  constructor(public storageService: StorageService,public taskService: TaskService, private platform: Platform, private router: Router) { }

  ngOnInit()
  {

  }


  getAllArticlesDespensa()
  {
    var categor = [];
    var cats = [];
    this.taskService.getAllArticlesDespensa()
      .then(data =>
      {
        this.articulosDespensa = data;
        console.log(this.articulosDespensa);
        this.articulosDespensa.forEach(element =>
        {
          cats.push(element['categoria']);
        });
        for (let i = cats.length - 1; i > 0; i--)
        {
          if (cats.indexOf(cats[i]) !== i) cats.splice(i, 1);
        }
        cats.forEach(element =>
        {
          categor[element] = [];
        });

        console.log(categor);
        this.articulosDespensa.forEach(element =>
        {
          categor[element['categoria']].push(element);
        });
        console.log(categor);
        this.categorias = categor;
      });

  }

  itemPurchased(articulo)
  {
    console.log(articulo);
  }

  addArt(articulo)
  {
    this.taskService.addArticleDesp(articulo,this.usuario )
      .subscribe(data =>
      {
      });
  }

  editar(articulo)
  {
    console.log(articulo);

  }

  borrar(articulo)
  {
    if (confirm('¿Quiere eliminar este artículo?'))
    {
      this.taskService.deleteArticleDespensa(articulo)
        .subscribe(data =>
        {
          this.getAllArticlesDespensa();
        });
    }
  }


  ngAfterViewInit()
  {
    this.getAllArticlesDespensa();
    this.usuario = parseInt(this.storageService.getLocal('userId'));
    this.backButtonSubscription = this.platform.backButton.subscribe(() =>
    {
      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy()
  {
    this.backButtonSubscription.unsubscribe();
  }

  ionViewWillEnter()
  {
    this.getAllArticlesDespensa();
  }

  doRefresh(event)
  {
    this.getAllArticlesDespensa();
    setTimeout(() =>
    {
      event.target.complete();
    }, 500);

  }

}
