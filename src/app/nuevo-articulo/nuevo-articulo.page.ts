import { Component, OnInit,OnDestroy,AfterViewInit  } from '@angular/core';
import { TaskService } from './../task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.page.html',
  styleUrls: ['./nuevo-articulo.page.scss','./../app.component.scss'],
})
export class NuevoArticuloPage implements OnInit {


  articulo: {
    'name': '',
    'brand': '',
    'supermarket': '',
    'categoria': '',
    'price': '',
    'fecha_desp': '',
    'pasillo':''
  };
  categorias: any;

  constructor(public taskService: TaskService,private platform: Platform,private rutaActiva: ActivatedRoute,private router: Router) { }

  ngOnInit()
  {

  }

   getCategories()
  {
    this.taskService.getCategories()
    .subscribe(data => {
      this.categorias = data;
      console.log(this.categorias);

    });
   }

  nuevoArt()
  {
    console.log(this.articulo);
  }

  volver()
  {
    this.router.navigate(['/despensa']);
  }
  ngAfterViewInit()
  {
    this.getCategories();
  }

}
