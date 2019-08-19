import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class VegetablesService {
  public vegetablesRef: firebase.firestore.CollectionReference;
  constructor() {
    this.vegetablesRef = firebase
      .firestore()
      .collection(`/vegetables`);
  }

  getList(): firebase.firestore.CollectionReference {
    return this.vegetablesRef;
  }
}
