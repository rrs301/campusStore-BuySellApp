import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'
import { Router } from '@angular/router';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  sell_rent:any=false;
  base64Image:any;
  p_title:any;
  desc:any;
  orignal_price:any;
  selling_price:any;
  category:any;
  today:any;
  myEmail:any;
  picData:any;
  myRef:any;
   image1;
  image2;
  image3;
  constructor(private route: Router, firebase:AngularFirestore,private storage: Storage,
    private mongodbService:MongoDBConnectService,
    private imagePicker: ImagePicker,private camera: Camera,public alertController: AlertController) {
    const formatter = new Intl.DateTimeFormat('fr', { month: 'short' });
    const month1 = formatter.format(new Date());
    let date=new Date();
    this.today=date.getDate()+" "+month1+" "+date.getFullYear();
    console.log(date.getDate());
    this.image1="https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg";
    this.image2="https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg";
    this.image3="https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg";
    // this.base64Image=this.image1;

   }

  ngOnInit() {
    this.storage.get('UserEmail').then((val) => {
      this.myEmail=val;
      console.log("MyEmail:"+this.myEmail);
    });

    this.myRef=firebase.storage().ref('/');
  }

  SelectFileToUpload(i:any)
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     
     if(i==1)
     {
       this.image1=this.base64Image;
     }
     else if(i==2)
     {
       this.image2=this.base64Image;
     }
     else
     {
      this.image3=this.base64Image;
     }

      // console.log(this.base64Image);
     }, (err) => {
      // Handle error
      console.log(err)
     })

     
  }
//Firebase Logic to Upload Image to Firestore
 uploadImage(imageURI:any,r:any){
 

   let Ref=firebase.storage().ref();
   let childRef=Ref.child(r);
//  childRef.putString(imageURI,'data_url').then(function(snapshot){
//    console.log("Uploaded");
//    this.picData=snapshot.ref.getDownloadURL();
//  })

 childRef.putString(imageURI,'data_url').then(data=>{
  console.log("Uploaded");
 
 // this.picData=data.downloadURL;
  
  
})
  }

  GenerateRandom()
  {
    let r = Math.random().toString(36).substring(7);
    return r;
  }
  async  PostAd()
  {
    let sellRent;
    let r1=this.GenerateRandom();
    let r2=this.GenerateRandom();
    let r3=this.GenerateRandom();
    this.uploadImage(this.image1,r1);
    this.uploadImage(this.image2,r2);
    this.uploadImage(this.image3,r3);
    let img1="https://firebasestorage.googleapis.com/v0/b/campusstore-73af0.appspot.com/o/"+r1+"?alt=media";
    let img2="https://firebasestorage.googleapis.com/v0/b/campusstore-73af0.appspot.com/o/"+r2+"?alt=media";
    let img3="https://firebasestorage.googleapis.com/v0/b/campusstore-73af0.appspot.com/o/"+r3+"?alt=media";
  

    if(this.category==undefined||this.p_title==undefined||this.desc==undefined||this.selling_price==undefined||this.orignal_price==undefined)
    { 
      console.log("OH");
      Swal.fire(
        'Please Enter All Field',
        '',
        'info'
      )
    }
    else{
      if(this.sell_rent==false)
      {
        sellRent="sell";
      }
      else{
        sellRent="rent";
      }
      
      
   
      let tempId=Math.floor(Math.random() * 99999) + 1  
        this.mongodbService.db.collection('items').
        insertOne({owner_id: this.mongodbService.client.auth.user.id,p_name:this.p_title,
          p_desc:this.desc,
          MRP:this.orignal_price,
          selling_for:this.selling_price,
          sell_rent:this.sell_rent,
          new_old:'old',
          p_category:this.category,
          image1:img1,
          image2:img2,
          image3:img3,
        id:tempId,
        email:this.myEmail,
        dateUpload:this.today.replace(".","")});

      
        Swal.fire({
          title: 'Ad Successfully Posted',
          text: "Your Ad is successfully Posted",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        }).then((result) => {
          if (result.value) {
            this.route.navigate(['/home']);
          }
        })
        // this.route.navigate(['/image-upload'],{
        //   queryParams:{
        //   pid: tempId,
         
        //   }
        //   }); 
      
       
    }
   
  }


  
}
