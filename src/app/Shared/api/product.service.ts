import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import SearchProduct from '../models/SearchProduct';
import ProductDetails from '../models/ProductDetails';

import { Subject } from 'rxjs';

@Injectable()
export default class ProductService {
  public API = 'http://localhost:8080/api/v1';
  
  public CATEGORY_API = `${this.API}/category`;
  public PRODUCT_API = `${this.API}/products`;
  private cartList$ : Subject<any> = new Subject()
  public userDetails$ : Subject<any> = new Subject();

 
  constructor(private http: HttpClient) {}

 
  
//my code

geAllCategory() {
  return this.http.get(`${this.CATEGORY_API}`);
}

getProductByCatId(categoryId: String) {
  return this.http.get(`${this.PRODUCT_API}/${categoryId.toString()}`);
}

addProductByCatId(categoryId:String, newProduct : any){
return this.http.post(`${this.PRODUCT_API}/${categoryId.toString()}/category`,newProduct);
}

addProductImage(ProductId:String, prodImage){
return this.http.post(`${this.API}/menu/${ProductId.toString()}/prodImages`,prodImage);
}


GetAllProductList() {
  // let result: Observable<ProductDetails>;
  return this.http.get<ProductDetails>(`${this.API}/product/`);
}

getImageByProductId(productId : String){
  return this.http.get(`${this.API}/menu/${productId.toString()}/prodImages` )
}


getAllImages(){
  return this.http.get(`${this.API}/menu/images`);
}
GetImageById(imageId :any){
  return this.http.get(`${this.API}/menu/images/${imageId}`);
}
GetProductById(prodId : String){
  return this.http.get(`${this.API}/product/${prodId.toString()}`);
}

sendCartList(cartListData) {
  this.cartList$.next(cartListData);
}

receiveCartList() {
  return this.cartList$.asObservable();
}

receiveUserDetails() {
  return this.userDetails$.asObservable();
}

sendUserDetails(userDetails) {
  this.userDetails$.next(userDetails);
}

}
