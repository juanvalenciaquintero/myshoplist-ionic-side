import { Component, OnInit } from '@angular/core';
import { TaskService } from './../task.service';
import { Platform } from '@ionic/angular';
import { StorageService } from './../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss','./../app.component.scss'],
})
export class UserPage implements OnInit {

  user: any;
  id: number;
  password1: any;
  password2: any;
  newPassword: boolean = false;
  backButtonSubscription;

  constructor(private authService: AuthService,private platform: Platform,public storageService: StorageService,public taskService: TaskService,private router: Router) { }

  ngOnInit()
  {
    this.id = this.storageService.getLocal('userId');
    console.log(this.id);
    this.taskService.checkUser(this.id)
      .subscribe(data =>
      {
        console.log(data);
        this.user = data[0];
        console.log(this.user.name);
      });
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

   desloguear()
  {
    if (this.authService.desloguear())
    {
      this.router.navigate(['/login']);
    };
  }

  actualizar()
  {
    this.taskService.updateUser(this.user)
      .then(data =>
      {
        alert('El usuario se ha modificado correctamente');
       console.log(data);
      });
  }

  newPass()
  {
    this.newPassword = true;
  }

  updatePass()
  {
    if (this.password1 === this.password2)
    {
      this.taskService.updatePass(this.user,this.password1)
        .then(data =>
        {
          alert('La contraseña se ha modificado correctamente');
          console.log(data);
        });
      this.newPassword = false;
    }
  }


}
