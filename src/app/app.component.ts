import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'applicationblog-frontend';
  constructor() {
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "your.apiKey",
    authDomain: "your.authDomain.frebaseapp.com",
    databaseURL: "https://your.databaseURL.firebaseio.com",
    projectId: "your.ProjectId",
    storageBucket: "your.storage.Bucket.appspot.com",
    messagingSenderId: "your.messagingSenderId",
    appId: "your.appId"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
