import { Component, OnInit } from '@angular/core';
import { Stitch, AnonymousCredential ,RemoteMongoClient} from 'mongodb-stitch-browser-sdk'

// const client = Stitch.initializeDefaultAppClient('campusstore-leklk');

// const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('CampusStore');
 
@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
