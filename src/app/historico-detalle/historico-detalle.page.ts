import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TaskService } from './../task.service';


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
    this.taskService.getHistorico(this.fecha)
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
