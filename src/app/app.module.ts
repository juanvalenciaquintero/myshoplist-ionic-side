import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { StorageService } from './services/storage.service';

// import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    AuthService,
    AuthGuard,
    AndroidFingerprintAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
