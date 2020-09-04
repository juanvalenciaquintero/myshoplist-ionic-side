import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from './../task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.page.html',
  styleUrls: ['./editar-articulo.page.scss','./../app.component.scss'],
})
export class EditarArticuloPage implements OnInit {

  backButtonSubscription;
  id: number;
  articulo: any;
  articulosDespensa: any;


  constructor(public taskService: TaskService,private platform: Platform,private rutaActiva: ActivatedRoute,private router: Router) { }

  ngOnInit()
  {
     this.getArticleDespensa();
  }

  getAllArticlesDespensa()
  {
    this.id = this.rutaActiva.snapshot.params.id;
    this.taskService.getAllArticlesDespensa()
    .then(data => {
      this.articulosDespensa = data;
      console.log(this.articulosDespensa);
    });
  }

  getArticleDespensa()
  {
    this.id = this.rutaActiva.snapshot.params.id;
    let art: any;
    this.taskService.getArticleDespensa(this.id)
      .subscribe(
        (data) =>
        {
          console.log(data);
          this.articulo = data[0];
        },
        (error) =>
        {
          console.log(error);
        }
    )
  }

  actualizar()
  {
    console.log(this.articulo);
    this.taskService.actualizar(this.articulo)
      .then(data =>
      {
        this.router.navigate(['/despensa']);
      });
  }

  volver()
  {
    this.router.navigate(['/despensa']);
  }

  ngAfterViewInit()
  {
    this.backButtonSubscription = this.platform.backButton.subscribe(()=>
    {
      this.router.navigate(['/despensa'])
    });
  }

  ngOnDestroy()
  {
    this.backButtonSubscription.unsubscribe();
  }
}
