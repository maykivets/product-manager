import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  public currentProduct: any;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const productId: string = this.route.snapshot.paramMap.get('id');
    this.productService
      .getProductDetail(productId)
      .get()
      .then(productSnapshot => {
        this.currentProduct = productSnapshot.data();
      });
  }
}
