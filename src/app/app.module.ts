import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    
  ],
  providers: [
    StatusBar,Camera,CallNumber,SocialSharing,
    SplashScreen,ImagePicker,FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
