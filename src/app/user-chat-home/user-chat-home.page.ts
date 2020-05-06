import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-user-chat-home',
  templateUrl: './user-chat-home.page.html',
  styleUrls: ['./user-chat-home.page.scss'],
})
export class UserChatHomePage implements OnInit {
  userDoc: any;
  UserList:any=[];
  myEmail:any="TA";

  constructor(private fireStore: AngularFirestore,
    private storage: Storage,
    private route: Router) {
   
   }

  ngOnInit() {
    //Save User Data
  //  this.fireStore.collection('UserChatList').add({
  //    email_1:'rahul@gmail.com',
  //    email_2:'saloni@gmail.com'
  //  })
  // this.storage.get('UserEmail').then((val) => {
  //   this.myEmail=val;
  //   console.log("MyEmail:"+this.myEmail);
  //   this.fireStore.collection('UserChatList',ref=>ref.where('email_1','==',this.myEmail))
  // .valueChanges().subscribe(v=>{          
      
  //     this.UserList=v;
  //     //console.log(this.UserList[0].email_1);
  // })
  // });


  this.storage.get('UserEmail').then((val) => {
    this.myEmail=val;
    console.log("MyEmail:"+this.myEmail);
    this.fireStore.collection('UserChatList',ref=>ref.where("email","array-contains",this.myEmail))
  .valueChanges().subscribe(v=>{          
      
      this.UserList=v;
      console.log(this.UserList);
  })
  });
  

  
}

ChatWithUser(UserEmail:any,chat_key:any,title:any)
{
    console.log(UserEmail);
    this.route.navigate(['/chat-ui'],{
      queryParams:{
        UserEmail:UserEmail,
        chat_key:chat_key,
        title
      }
      });
}

}
