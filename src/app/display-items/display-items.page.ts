import { Component, OnInit } from '@angular/core';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import Swal from 'sweetalert2'
import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.page.html',
  styleUrls: ['./display-items.page.scss'],
})
export class DisplayItemsPage implements OnInit {
result:any=[];
itemDetails:any=[];
cat:any;
title:any;
description:any;
price:any
mrp:any;
dateUpload:any
image1:any;
image2:any;
image3:any;
isUsers:any;
pid:any;
myEmail:any;
  constructor(private mongodbService:MongoDBConnectService,
    public navCtrl: NavController,private storage: Storage,
    private socialSharing: SocialSharing,
    private fireStore: AngularFirestore,private route: Router,
    public activatedRoute : ActivatedRoute,private callNumber: CallNumber) {
      this.storage.get('UserEmail').then((val) => {
        this.myEmail=val;
        console.log("MyEmail:"+this.myEmail);
      });
    this.activatedRoute.queryParams.subscribe((res)=>{
     console.log(res.user);
      this.isUsers=res.user;
      this.pid=res.pid;
      // let tempId=Number(res.pid);
      this.mongodbService.db.collection('items').find({id:Number(res.pid)}).asArray()
      .then(docs => {
         
          this.itemDetails=docs;
          this.cat=(this.itemDetails[0].p_category).toUpperCase();
          this.title=this.itemDetails[0].p_name;
          this.description=this.itemDetails[0].p_desc;
          this.price=this.itemDetails[0].selling_for;
          this.mrp=this.itemDetails[0].MRP;
          this.image1=this.itemDetails[0].image1;
          this.image2=this.itemDetails[0].image2;
          this.image3=this.itemDetails[0].image3;
          this.dateUpload=this.itemDetails[0].dateUpload;
          console.log("Found docs", this.itemDetails)
          Swal.close();
          console.log("[MongoDB Stitch] Connected to Stitch")
      }).catch(err => {
          console.error(err)
      });

    });
    Swal.fire('Please wait')
    Swal.showLoading();
   
      
     
  }
  DeletePost()
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.mongodbService.db.collection('items').deleteOne({id:Number(this.pid)})
    .then(docs => {
      this.navCtrl.navigateForward('my-post');
    })
    .catch(err => {
          console.error(err)
      });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your Post is safe :)',
          'error'
        )
      }
    })

    

  }

  CallUser()
  {
   
//       this.callNumber.callNumber(val, true)
// .then(res => console.log('Launched dialer!', res))
// .catch(err => console.log('Error launching dialer', err));
    
    console.log("OK");
  window.open('mailto:'+this.myEmail);


  }
  ngOnInit() {
  }

  SendMsg()
  {
    console.log(this.itemDetails[0].email);
    // this.mongodbService.db.collection('UserDetails').find({email:"rs@gmail.com"}).asArray()
    // .then(docs => {
    //   console.log(docs);
    // });
    Swal.fire('Please wait')
    Swal.showLoading();
     this.fireStore.collection('UserChatList').doc(this.myEmail+this.itemDetails[0].email).set({
         email_1:this.itemDetails[0].email,
    email_2:this.myEmail,
       email:[this.myEmail,this.itemDetails[0].email],
     chat_key:this.myEmail+this.itemDetails[0].email,
     title:this.title,
   })
  //  this.fireStore.collection('UserChatList').doc(this.itemDetails[0].email+this.myEmail).set({
  //   email_1:this.itemDetails[0].email,
  //   email_2:this.myEmail,
  //   chat_key:this.myEmail+this.itemDetails[0].email,
  //   title:this.title,
   
  // })
  Swal.close();
  this.route.navigate(['/user-chat-home']);
  }


  ShareDetails()
  {
    this.socialSharing.share(this.title, this.description,null, "Download Campus Store App, For More Details http:geekydevil.com");
  }

}
