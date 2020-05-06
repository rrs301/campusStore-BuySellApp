import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.page.html',
  styleUrls: ['./chat-ui.page.scss'],
  
})

export class ChatUIPage implements OnInit {
  @ViewChild('content',{static: true}) content:any;
  container: HTMLElement; 
  myEmail:any="rahul@gmail.com";
  userEmail:any;
  Msg:any;
  UserMsgList:any=[];
  chat_key:any;
  constructor(private storage: Storage,
    public activatedRoute : ActivatedRoute,private fireStore: AngularFirestore) {

    this.storage.get('UserEmail').then((val) => {
      this.myEmail=val;
      console.log("MyEmail:"+this.myEmail);
    });

  

   }

  ngOnInit() {
   
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res);
      this.userEmail=res.UserEmail;
      this.chat_key=res.chat_key;
      this.getAllMsg();
    
    });
  }

  scrollToBottom() {
  this.container = document.getElementById("temp");  
  console.log(this.container);  
  this.container.scrollTop = this.container.scrollHeight; 
}
  SendMsg()
  {
      console.log(this.Msg);
     
      this.fireStore.collection('UserChat').doc(this.chat_key).collection('chat').add({
     sender:this.myEmail,
     reciver:this.userEmail,
     msg:this.Msg,
     currentTime:new Date(),
   })
   this.scrollToBottom();
   this.Msg="";
  }

  getAllMsg()
  {
    this.fireStore
  .collection('UserChat').doc(this.chat_key).collection('chat',ref=>ref.orderBy("currentTime"))
  .valueChanges().subscribe(v=>{          
      this.UserMsgList=v;
      console.log(this.UserMsgList);
      this.scrollToBottom();
    //  console.log(this.UserList[0].email_1);
  })
  }
}
