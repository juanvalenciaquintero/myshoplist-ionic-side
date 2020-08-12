import { TaskService } from './../task.service';
import { Component, Input,OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico-articulos',
  templateUrl: './historico-articulos.page.html',
  styleUrls: ['./historico-articulos.page.scss','./../app.component.scss'],
})
export class HistoricoArticulosPage implements OnInit
{

  listas: any;
  artículos
  backButtonSubscription;

  constructor(public taskService: TaskService,private platform: Platform,private router: Router) { }

  ngOnInit()
  {
    this.checkLists();
  }

  checkLists(): void
  {
    this.taskService.checkLists()
      .subscribe(data =>
      {
        this.listas = data;
        console.log(data);
      }
      );
  }

  ngAfterViewInit()
  {
    this.backButtonSubscription = this.platform.backButton.subscribe(()=>
    {
      this.router.navigate(['/home'])
    });
  }

  ngOnDestroy()
  {
    this.backButtonSubscription.unsubscribe();
  }

}
