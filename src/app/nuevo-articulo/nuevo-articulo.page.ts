import { Articulo } from './../interfaces/articulo';
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


  checkoutForm;
  articulo: Articulo = {
    id:0,
    name: '',
    brand: '',
    supermarket: '',
    price: 0,
    fecha_desp: '2020-09-18',
    pasillo: 0,
    categoria: 0,
  }

  categorias: any;

  constructor( public taskService: TaskService, private platform: Platform, private rutaActiva: ActivatedRoute, private router: Router)
  {


  }

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
    this.taskService.nuevoArtDesp(this.articulo)
    .then(data => {
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
    this.getCategories();
  }

}
