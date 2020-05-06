import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MongoDBConnectService } from '../mongo-dbconnect.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})
export class ImageUploadPage implements OnInit {
  picData:any;
  myRef:any;
   image1;
  image2;
  image3;
  base64Image;
  constructor(private route: Router, firebase:AngularFirestore,private storage: Storage,
    private mongodbService:MongoDBConnectService,
    private imagePicker: ImagePicker,private camera: Camera,public alertController: AlertController) { }

  ngOnInit() {
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
      
      // console.log(this.base64Image);
         this.uploadImage(this.base64Image,i);

     }, (err) => {
      // Handle error
      console.log(err)
     })
  }
//Firebase Logic to Upload Image to Firestore
 uploadImage(imageURI:any,i:any){
  let r = Math.random().toString(36).substring(7);
  console.log("random", r);

   let Ref=firebase.storage().ref();
 let childRef=Ref.child(r);
//  childRef.putString(imageURI,'data_url').then(function(snapshot){
//    console.log("Uploaded");
//    this.picData=snapshot.ref.getDownloadURL();
//  })

 childRef.putString(imageURI,'data_url').then(data=>{
  console.log("Uploaded");
  if(i==1)
  {
      this.image1="https://firebasestorage.googleapis.com/v0/b/campusstore-73af0.appspot.com/o/"+r+"?alt=media";
  }
  else if(i==2)
  {
    this.image2="https://firebasestorage.googleapis.com/v0/b/campusstore-73af0.appspot.com/o/"+r+"?alt=media";

  }
  else
  {
    this.image3="https://firebasestorage.googleapis.com/v0/b/campusstore-73af0.appspot.com/o/"+r+"?alt=media";

  }
  this.picData=data.downloadURL;
  
  
})
  }

}
