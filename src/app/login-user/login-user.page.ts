import { Component, OnInit } from '@angular/core';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import { UserPasswordCredential } from 'mongodb-stitch-core-sdk';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss'],
})
export class LoginUserPage implements OnInit {

  email:any;
  password:any;
  constructor(private mongodbService:MongoDBConnectService,private storage: Storage,private route: Router) { }

  ngOnInit() {
    this.storage.clear();
  }
  
  Login()
  {
   
const credential = new UserPasswordCredential(this.email, this.password)
this.mongodbService.client.auth.loginWithCredential(credential)
  // Returns a promise that resolves to the authenticated user
  .then(authedUser => {
    console.log(`successfully logged in with id: ${authedUser.id}`)
  this.storage.set("login","Yes");
  this.storage.set('UserEmail', this.email);
  this.storage.set("UserId",authedUser.id);

  this.mongodbService.AddUser();
  this.route.navigate(['/home']);  
})
  .catch(err => {
    console.error(`login failed with error: ${err}`);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Username Or Password is Incorrect",
     
    })
  })

  }
  Signup()
  {
    this.route.navigate(['/signup']); 
  }

  
}
