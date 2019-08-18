import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userID: string;
  constructor() {
    this.userID = firebase.auth().currentUser.uid;
  }

}
