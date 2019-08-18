import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Query = firebase.database.Query;

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

  getProductList(userID: string): firebase.firestore.CollectionReference | Query {
    if (userID) {
      return this.productListRef.where('user', '==', userID);
    }
    return this.productListRef;
  }

  getProductDetail(productId: string): firebase.firestore.DocumentReference {
    return this.productListRef.doc(productId);
  }
}
