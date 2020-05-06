import { Component, OnInit } from '@angular/core';
import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'
import { ActivatedRoute, Router } from '@angular/router';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import Swal from 'sweetalert2'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-items-lists',
  templateUrl: './items-lists.page.html',
  styleUrls: ['./items-lists.page.scss'],
})
export class ItemsListsPage implements OnInit {

  items:any=[];
  result:any=[];
  category:any;
  constructor(public activatedRoute : ActivatedRoute,
    private mongodbService:MongoDBConnectService,public navCtrl: NavController,private route: Router) { 
    
   
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res.cat);
      this.category=res.cat;
      Swal.fire('Please wait')
      Swal.showLoading();
      console.log(this.category);
      if(this.category==undefined)
      {
        this.mongodbService.db.collection('items').find({},{sort:{_id:-1}}).asArray()
        .then(docs => {
            this.items=docs;
            console.log("Found docs", this.items)
            Swal.close();
            console.log("[MongoDB Stitch] Connected to Stitch")
        }).catch(err => {
            console.error(err)
        });
      }
      else if(res.search)
      {
        console.log(res.search);
      this.mongodbService.db.collection('items').find({p_name:{$regex: res.search}},{sort:{_id:-1}}).asArray()
        .then(docs => {
            this.items=docs;
            console.log("Found docs", this.items)
            Swal.close();
            console.log("[MongoDB Stitch] Connected to Stitch")
        }).catch(err => {
            console.error(err)
        }); 
      }
      else
      {
        console.log(res.search);
        this.mongodbService.db.collection('items').find({p_category:this.category},{sort:{_id:-1}}).asArray()
      .then(docs => {
          this.items=docs;
          console.log("Found docs", this.items)
          Swal.close();
          console.log("[MongoDB Stitch] Connected to Stitch")
      }).catch(err => {
          console.error(err)
      });
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