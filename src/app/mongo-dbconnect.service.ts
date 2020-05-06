import { Injectable } from '@angular/core';

import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class MongoDBConnectService {

  items:any=[];
  s_username:any;
  email:any;
  phone:any;
  
  client = Stitch.initializeDefaultAppClient('campusstore-leklk');

db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('CampusStore');

  constructor(private storage: Storage) { this.GetData();
    storage.get('UserName').then((val) => {
      this.s_username=val;
       console.log("Username is:"+this.s_username);
      });
      storage.get('UserEmail').then((val) => {
        this.email=val;
         console.log("Username is:"+this.email);
        });

        storage.get('phone').then((val) => {
       
          console.log("phone"+val);
         this.phone=val;
         
         });
 
      storage.get('UserId').then((val) => {
       
         console.log("UserId is:"+val);
        
         this.CheckUserData(val);
        });

        
    
    }

      

  GetData()
  {
    console.log("GERE");   
  }

  CheckUserData(id:any)
  {
    this.db.collection('UserDetails').find({owner_id:id}).asArray()
    .then(docs => {
    this.items=docs;
    console.log("Found docs", this.items.phone);
    this.storage.set("phone",this.items.phone);
    // if(this.items.length==0)
    // {
    //   this.AddUser();
    // }
    return this.items;
   // console.log("[MongoDB Stitch] Connected to Stitch")
    }).catch(err => {
    console.error(err)
    this.AddUser();
    });

  }



  AddUser()
  {
    
   
      this.db.collection('UserDetails').insertOne({
        owner_id: this.client.auth.user.id,email:this.email,phone:this.phone})
        
    .then(() =>{
      this.storage.set('Register',"Yes");
      console.log("Data Inserted");
    });
  }
}
