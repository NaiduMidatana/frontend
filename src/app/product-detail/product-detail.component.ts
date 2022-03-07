import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import ProductService from '../Shared/api/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import SearchProduct from '../Shared/models/SearchProduct';
import ProductDetails from '../Shared/models/ProductDetails';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cartDetails = {ProductId: 0, ProductName: '', ProductImage: '', Quantity: 0, UnitPrice: 0, TotalPrice: 0};
  cartList = [];
  productQuantity: any;
  isAvailabele = false;
  lblMessage: string;
  product: any;
  imageData : any;
  imageId:any;
  image:any;
  searchProduct: SearchProduct = new SearchProduct();
  constructor(private productService: ProductService
    ,         private route: ActivatedRoute
    ,         private router: Router,
              private sanitizer : DomSanitizer
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
       
        this.productService.getImageByProductId(id).subscribe(data => {
          
            this.imageData = data;
          
  
          });
      }
    });
  }

  SelectedImage(image) {
    this.product.DefaultImage = image;
  }

  addTocart(prodId) {
    this.cartDetails.ProductId = prodId;
    this.cartDetails.ProductImage = this.imageData.picByte;
    this.cartDetails.ProductName = this.imageData.product.prodName;
    this.cartDetails.Quantity = this.productQuantity;
    this.cartDetails.UnitPrice = this.imageData.product.price;
    this.cartDetails.TotalPrice = (this.imageData.product.price) * (parseFloat(this.productQuantity));


    if ( sessionStorage.getItem('CartList') !== null && sessionStorage.getItem('CartList') !== undefined) {
      this.cartList = JSON.parse(sessionStorage.getItem('CartList'));
      this.cartList.push(this.cartDetails);
    } else {
      this.cartList.push(this.cartDetails);
    }
    sessionStorage.setItem('CartList', JSON.stringify(this.cartList));
    this.productService.sendCartList(this.cartList);
    this.gotoList();
  }

  validatequantity() {
    console.log(this.productQuantity);
    if (this.productQuantity < 1) {
      this.lblMessage = 'Invalid';
      this.isAvailabele = false;
    } else {
      this.lblMessage = '';
      this.isAvailabele = true;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/cart-list']);
  }
}
