import { Component, OnInit } from '@angular/core';

import { TaskService } from './../task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico-detalle',
  templateUrl: './historico-detalle.page.html',
  styleUrls: ['./historico-detalle.page.scss','./../app.component.scss'],
})
export class HistoricoDetallePage implements OnInit
{

  backButtonSubscription;
  fecha: any;
  articulo: any;
  articulosHistorico: any;

  constructor(public taskService: TaskService, private platform: Platform, private rutaActiva: ActivatedRoute, private router: Router)  {  }

  ngOnInit() {
      this.getArticlesHistory();
  }

  getArticlesHistory()
  {
    this.fecha = this.rutaActiva.snapshot.params.fecha;
    console.log(this.fecha);
    this.taskService.getArticlesHistory(this.fecha)
      .subscribe(data =>
      {
        console.log(data);
        this.articulosHistorico = data;
      });

  }

    ngAfterViewInit()
  {
    this.backButtonSubscription = this.platform.backButton.subscribe(()=>
    {
      this.router.navigate(['/historico-articulos'])
    });
  }

   ngOnDestroy()
  {
    this.backButtonSubscription.unsubscribe();
  }

}
