import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService} from '../../services/product/product.service';

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  public currentProduct: any;
  public pictures: any;
  public productPicture: string = null;
  public productId: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService
      .getProductDetail(this.productId)
      .get()
      .then(productSnapshot => {
        this.currentProduct = productSnapshot.data();
        this.pictures = [];
        this.productService
          .getPictures(this.productId)
          .get()
          .then(picturesQuerySnapshot => {
            picturesQuerySnapshot.forEach(snap => {
              this.pictures.push(snap.data());
            });
          });
      });
  }

  addPicture(): void {
    this.productService
      .addPicture(
        this.productId,
        this.productPicture
      )
      .then(() => {
        this.productPicture = null;
      });
  }

  async takePicture(): Promise<void> {
    try {
      const picture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      this.productPicture = picture.base64String;

      this.addPicture();
    } catch (error) {
      console.error(error);
    }
  }
}
