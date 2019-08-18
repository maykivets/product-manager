import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {uuid4} from '../../../../node_modules/@capacitor/core/dist/esm/util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productListRef: firebase.firestore.CollectionReference;
  constructor() {
    this.productListRef = firebase
      .firestore()
      .collection(`/productList`);
  }

  createProduct(
    productName: string,
    productDescription: string,
    productPrice: number,
  ): Promise<firebase.firestore.DocumentReference> {
    return this.productListRef.add({
      name: productName,
      description: productDescription,
      price: productPrice,
      user: firebase.auth().currentUser.uid
    });
  }

  getProductList(userID: string): any {
    if (userID) {
      return this.productListRef.where('user', '==', userID);
    }
    return this.productListRef;
  }

  getProductDetail(productId: string): firebase.firestore.DocumentReference {
    return this.productListRef.doc(productId);
  }

  getPictures(productId: string): any {
    return this.productListRef
      .doc(productId)
      .collection('pictures')
      .orderBy('createdAt', 'desc');
  }

  addPicture(productId: string, productPicture: string): any {
    const fileName: string = uuid4();
    const storageRef = firebase
      .storage()
      .ref(`/productList/${productId}/${fileName}.png`);
    return storageRef
      .putString(productPicture, 'base64', { contentType: 'image/png' })
      .then(() => {
        return storageRef.getDownloadURL().then(downloadURL => {
          return this.productListRef
            .doc(productId)
            .collection('pictures')
            .add({
              url: downloadURL,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
      });
  }
}
