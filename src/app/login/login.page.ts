import { StorageService } from './../services/storage.service';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from './../task.service';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss','./../app.component.scss'],
})
export class LoginPage implements OnInit
{

  user: string;
  pass: string;

  constructor(public storageService: StorageService, public taskService: TaskService,private router: Router) { }

  ngOnInit()
  {

    console.log(this.storageService.getLocal('logged'));
    console.log(this.storageService.getLocal('userId'));


    // this.faio.show({
    //   clientId: 'Fingerprint-demo',
    //   clientSecret:'password'
    // })
    //   .then(result =>
    //   {
    //     this.router.navigate(['/home']);
    //   })
    //   .catch(err =>
    //   {
    //     console.log('Error:' + err);
    //   })
  }


  checklogin()
  {
    this.taskService.checklogin(this.user,this.pass)
      .then(data =>
      {
        console.log(data);
        if (data!=='false')
        {
          console.log(data);
          this.storageService.setLocal('logged', true);
          this.storageService.setLocal('userId', data);
          this.router.navigate(['/home']);
        }
      });

  }

}
