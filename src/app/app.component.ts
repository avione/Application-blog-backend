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
    apiKey: "AIzaSyBlBsLPyKJ0z2cjhy2Vxtt_F9ThpHN5FWE",
    authDomain: "mes-livres-3a071.firebaseapp.com",
    databaseURL: "https://mes-livres-3a071.firebaseio.com",
    projectId: "mes-livres-3a071",
    storageBucket: "mes-livres-3a071.appspot.com",
    messagingSenderId: "21310261064",
    appId: "1:21310261064:web:76e97c8b65d50748"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
