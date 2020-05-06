import { Component } from '@angular/core';

import { Stitch, AnonymousCredential ,RemoteMongoClient, UserPasswordCredential} from 'mongodb-stitch-browser-sdk'
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2';
// const client = Stitch.initializeDefaultAppClient('campusstore-leklk');

// const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('CampusStore');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
 items:any=[];
 s_email:any;
 s_pass:any;
 s_username:any;
 searchMe:any;
  constructor(public navCtrl: NavController,private storage: Storage,private route: Router,
    private mongodbService:MongoDBConnectService) {
    storage.get('login').then((val) => { 
      if(val==null)
      {
        console.log("OOO",val);
        this.route.navigate(['/login-user']);
      }

    });
    
    
    

    //this.RegsiterUserToMongo();
    
   

// this.mongodbService.client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
this.mongodbService.db.collection('items').find({},{limit:5,sort:{_id:-1}}).asArray()
.then(docs => {
   
    this.items=docs;
    console.log("Found docs", this.items)
    return this.items;
   // console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});


}

RegsiterUserToMongo()
{
  const app = Stitch.defaultAppClient;
  this.storage.get('UserEmail').then((val) => {
    this.s_email=val;
    console.log(this.s_email);
    this.storage.get('UserPassword').then((val) => {
      this.s_pass=val;
      console.log(this.s_pass);
      const credential = new UserPasswordCredential(this.s_email, this.s_pass);
      app.auth.loginWithCredential(credential)
      .then(authedUser => {
        console.log(`successfully logged in with id: ${authedUser.id}`);
        console.log(authedUser.id);
        this.storage.set("UserId",authedUser.id);
        this.storage.set("Register","Yes");
        this.mongodbService.client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
         this.mongodbService.db.collection('UserDetails').insertOne({
           owner_id: this.mongodbService.client.auth.user.id,email:this.s_email})
           
       ).then(() =>{
         this.storage.set('Register',"Yes");
       }
       
       );
       
      })
      .catch(err => console.error(`login failed with error: ${err}`))
    });
  });

}
Search()
{
  console.log(this.searchMe);
  this.route.navigate(['/items-lists'],{
    queryParams:{
    cat: "",
    search:this.searchMe,
   
    }
    });
}
ngOnInit() {
  //this.mongodbService.GetData()
}


//   InsertSampleData(){
//     console.log("Yes");
//   client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
//   db.collection('items').insertOne({owner_id: client.auth.user.id,p_name:'Ipone 9 For sell',p_desc:'iPhone 8 for Sell',
// MRP:'599$',selling_for:'200$',sell_rent:'sell',new_old:'old',p_category:'furniture',image1:'https://icdn6.digitaltrends.com/image/digitaltrends/craigslist-used-phone-scam-3-1500x1000.jpg'}));
//   }
//   InsertSampleUser(){
//     console.log("Yes");
//   client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
//   db.collection('UserDetails').insertOne({owner_id: client.auth.user.id,user_name:'Rahul Sanap'}));
//   }

  
AddNewItem() {
 // this.route.navigate(['/add-items']);
  this.navCtrl.navigateForward('add-item');
}
GetListOfItem(category:any) {
 // this.navCtrl.navigateForward('/items-lists');
 // this.route.navigate(['/items-list']);
  this.route.navigate(['/items-lists'],{
    queryParams:{
    cat: category,
   
    }
    });
}
productDetails(id:any)
{
  this.route.navigate(['/display-items'],{
    queryParams:{
    pid: id,
   
    }
    });

}

}
