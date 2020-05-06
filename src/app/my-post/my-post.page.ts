import { Component, OnInit } from '@angular/core';
import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import Swal from 'sweetalert2'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.page.html',
  styleUrls: ['./my-post.page.scss'],
})
export class MyPostPage implements OnInit {

  items:any=[];
  result:any=[];
  category:any;
  userId:String;
  constructor(public activatedRoute : ActivatedRoute,
    private mongodbService:MongoDBConnectService,
    private storage: Storage,
    public navCtrl: NavController,private route: Router) { 
    
   
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res)=>{
    //  console.log(res.cat);
      this.category=res.cat;
      Swal.fire('Please wait')
      Swal.showLoading();
      this.storage.get('UserId').then((val) => {
        this.userId=val.toString();
        console.log(this.userId);
        this.mongodbService.db.collection('items').find({owner_id:val},{sort:{_id:-1}}).asArray()
        .then(docs => {
            this.items=docs;
            console.log("Found docs", this.items)
            Swal.close();
            console.log("[MongoDB Stitch] Connected to Stitch")
        }).catch(err => {
            console.error(err)
        });
       });
      
     
        
      
      
    });
  }

  productDetails(id:any)
  {
    this.route.navigate(['/display-items'],{
      queryParams:{
      pid: id,
      user:'yes',
      }
      });
  
  }
}