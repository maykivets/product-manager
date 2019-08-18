import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
  styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit {

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
  }

  createProduct(
    productName: string,
    productDescription: string,
    productPrice: number
  ): void {
    if (
      productName === undefined ||
      productDescription === undefined ||
      productPrice === undefined
    ) {
      return;
    }
    this.productService
      .createProduct(productName, productDescription, productPrice)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }
}
