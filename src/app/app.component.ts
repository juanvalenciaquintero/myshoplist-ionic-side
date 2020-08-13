import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Lista',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Despensa',
      url: '/despensa',
      icon: 'cart'
    },
    {
      title: 'Historico',
      url: '/historico-articulos',
      icon: 'list'
    },
    {
      title: 'Usuario',
      url: '/user',
      icon: 'person'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public androidFingerprintAuth: AndroidFingerprintAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    //   this.androidFingerprintAuth.isAvailable().then(
    //     (result) =>
    //     {
    //       if (result.isAvailable)
    //       {
    //         this.androidFingerprintAuth.encrypt({ clientId: "clienteid", username: "username", password: "password" }).then((result) =>
    //         {
    //           if (result.withFingerprint)
    //           {
    //             // alert("Successfully authenticated with fingerprint");
    //             // alert("Encrypt credentials: " + result.token);
    //             this.router.navigate(['/home']);
    //           } else if (result.withBackup)
    //           {
    //             // alert("Succesfully authenticated with backup password");
    //             this.router.navigate(['/home']);
    //           } else
    //           {
    //            alert("Didnot authenticate!");
    //           }
    //         }, (err) =>
    //         {
    //             if (err === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED)
    //             {
    //               alert("Fingerprint authentication cancelled");
    //             }
    //             else
    //             {
    //               alert(JSON.stringify(err));
    //             }
    //         })
    //       } else
    //       {
    //         alert("Fingerprint authentication not available");
    //       }
    //     }, (err) =>
    // {
    //     alert(JSON.stringify(err));
    // })
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
