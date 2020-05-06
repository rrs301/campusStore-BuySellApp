import { Component, OnInit } from '@angular/core';
import { Stitch, AnonymousCredential ,RemoteMongoClient, UserPasswordAuthProviderClient, FacebookRedirectCredential, UserPasswordCredential} from 'mongodb-stitch-browser-sdk'
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email:any;
  password:any;
  s_email:any;
  s_pass:any;
  username:any;
  phone:any;
  constructor(private mongodbService:MongoDBConnectService,private storage: Storage,private route: Router) {
  //  Stitch.initializeDefaultAppClient("campusstore-leklk");
  
    storage.clear();
 


 
   }

  ngOnInit() {
  }

  SignUp()
  {
    const emailPasswordClient = Stitch.defaultAppClient.auth
    .getProviderClient(UserPasswordAuthProviderClient.factory);
  
  emailPasswordClient.registerWithEmail(this.email, this.password)
    .then(() => {
      console.log("Successfully sent account confirmation email!")

      
      this.storage.set('UserEmail', this.email);
      this.storage.set('UserPassword',this.password);
      this.storage.set("UserName",this.username);
      this.storage.set("Signup","Yes");
      this.storage.set("phone",this.phone);
      this.route.navigate(['/login-user']);
    
    })
    .catch(err => console.error("Error registering new user:", err));
 

    
 
}

Login()
{
  this.route.navigate(['/login-user']);
}
  

}
