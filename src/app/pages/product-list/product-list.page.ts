import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  public productList: Array<any>;
  public withPictures = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userID: string = this.route.snapshot.paramMap.get('id');
    this.productService
      .getProductList(userID)
      .get()
      .then(productListSnapshot => {
        this.productList = [];
        productListSnapshot.forEach(snap => {
          const data = snap.data();
          this.productList.push({
            id: snap.id,
            name: data.name,
            price: data.price,
            description: data.description,
            hasPhoto: data.hasPhoto,
          });
        });
      });
  }
}
