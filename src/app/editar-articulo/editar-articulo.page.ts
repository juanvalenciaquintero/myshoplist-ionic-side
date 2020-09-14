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
  categorias: any;


  constructor(public taskService: TaskService,private platform: Platform,private rutaActiva: ActivatedRoute,private router: Router) { }


  ngOnInit()
  {
    this.getArticleDespensa();

  }

  compareFnc(c1:any,c2:any)
  {
    console.log(c1);
    console.log(c2);
    console.log(this.articulo);
    return c1.id===this.articulo.categoria;
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

          this.getCategories();
        },
        (error) =>
        {
          console.log(error);
        }
    )
  }

  getCategories()
  {
    this.taskService.getCategories()
    .subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);
      console.log(this.articulo.categoria);

      this.categorias.selectedValue = this.articulo.categoria;
    });
  }

  actualizar()
  {
    console.log(this.articulo);
    this.taskService.actualizar(this.articulo)
      .then(data =>
      {
        console.log(data);
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
