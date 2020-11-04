import { TaskService } from './../task.service';
import { Component, Input,OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despensa',
  templateUrl: './despensa.page.html',
  styleUrls: ['./despensa.page.scss','./../app.component.scss'],
})
export class DespensaPage implements OnInit {

  backButtonSubscription;
  @Input() articulosDespensa: any;

  constructor(public taskService: TaskService,private platform: Platform,private router: Router) { }

  ngOnInit()
  {

  }


  getAllArticlesDespensa() {
    this.taskService.getAllArticlesDespensa()
    .then(data => {
      this.articulosDespensa = data;
      console.log(this.articulosDespensa);
    });

  }

  itemPurchased(articulo)
  {
    console.log(articulo);
  }

  addArt(articulo)
  {
  this.taskService.addArticleDesp(articulo)
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
      .subscribe(data => {
        this.getAllArticlesDespensa();
      });
    }
  }


  ngAfterViewInit()
  {
    this.getAllArticlesDespensa();

    this.backButtonSubscription = this.platform.backButton.subscribe(()=>
    {
      this.router.navigate(['/home'])
    });
  }

  ngOnDestroy()
  {
    this.backButtonSubscription.unsubscribe();
  }

  ionViewWillEnter(){
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
