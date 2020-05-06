import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MongoDBConnectService } from './mongo-dbconnect.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Add Post/Sell Item',
      url: '/add-item',
      icon: 'add'
    },
    {
      title: 'My Posted Ads',
      url: '/my-post',
      icon: 'archive'
    },
    {
      title: 'Chat Box',
      url: '/user-chat-home',
      icon: 'chatbubbles'
    },
   
    // {
    //   title: 'Logout',
    //   url: '/list',
    //   icon: 'log-out'
    // }
  ];
  UserName:any;
  UserEmail:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private statusBar: StatusBar,
    private route: Router,
    private socialSharing: SocialSharing,
    private mongodbService:MongoDBConnectService
  ) {
    this.initializeApp();
   // this.UserName=this.mongodbService.s_username;
   // console.log(this.mongodbService.s_username);
   storage.get('UserName').then((val) => {
   console.log(val);
   this.UserName=val;
    
   });
   storage.get('UserEmail').then((val) => {
    console.log(val);
    this.UserEmail=val;
     
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout()
  {
    console.log("Logout");
    this.storage.clear();
    this.route.navigate(['/login-user']);  
   
  }

  ShareApp()
  {
    this.socialSharing.share("Campus Store", "Buy Sell Rent In your Campus",null, "Download Campus Store App, For More Details http:geekydevil.com");
  }
}
