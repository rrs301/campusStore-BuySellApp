import { Component, OnInit } from '@angular/core';
 import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'

import { ActivatedRoute } from '@angular/router';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  items:any=[];
  result:any=[];
  
  constructor(public activatedRoute : ActivatedRoute,private mongodbService:MongoDBConnectService) { 
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res);
      this.result=res;
      
    });

  
    this.mongodbService.client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
      
      this.mongodbService.db.collection('items').find().asArray()
    ).then(docs => {
       
        this.items=docs;
        console.log("Found docs", this.items)
        console.log("[MongoDB Stitch] Connected to Stitch")
    }).catch(err => {
        console.error(err)
    });
  }

  ngOnInit() {
  }

}
