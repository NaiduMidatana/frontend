import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import OrderService from '../Shared/api/order.service';
import ProductService from '../Shared/api/product.service';

import Order from '../Shared/models/Order';
import OrderDetail from '../Shared/models/OrderDetail';
import BillingAddress from '../Shared/models/SearchProduct';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers: [OrderService]
})
export class CartListComponent implements OnInit, OnDestroy  {
  cartListItem: any;
  grandTotal: number;
  sub: Subscription;
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  loginDetail: any;
  CustomerId: any;
  shippingAddress :BillingAddress = new BillingAddress();
  addressflag : boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService, private productService : ProductService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
    this.calculateGrandTotal(this.cartListItem);
  }

  removefromcart(productId) {
    this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
    this.findAndRemove(this.cartListItem, 'ProductId', productId);
    this.productService.sendCartList(this.cartListItem);
    sessionStorage.setItem('CartList', JSON.stringify(this.cartListItem));
  }

  findAndRemove(array, property, value) {
    // tslint:disable-next-line:only-arrow-functions
    array.forEach(function(result, index) {
      if (result[property] === value) {
        // Remove from array
        array.splice(index, 1);
      }
    });
    this.calculateGrandTotal(this.cartListItem);
  }

  addquantity(productId) {
    this.findElementById(this.cartListItem, 'ProductId', productId, 'Add');
    this.calculateGrandTotal(this.cartListItem);
  }

  removequantity(productId) {
    this.findElementById(this.cartListItem, 'ProductId', productId, 'Remove');
    this.calculateGrandTotal(this.cartListItem);
  }

  findElementById(array, property, value, type) {
    if (type === 'Add') {
      // tslint:disable-next-line:only-arrow-functions
      array.forEach(function(result, index) {
        if (result[property] === value) {
          result.Quantity = parseFloat(result.Quantity) + 1;
          result.TotalPrice = parseFloat(result.Quantity) * parseFloat(result.UnitPrice);
        }
      });
    } else if (type === 'Remove') {
      // tslint:disable-next-line:only-arrow-functions
      array.forEach(function(result, index) {
        if (result[property] === value) {
          result.Quantity = parseFloat(result.Quantity) - 1;
          result.TotalPrice = parseFloat(result.Quantity) * parseFloat(result.UnitPrice);
        }
      });
    }
  }

  calculateGrandTotal(array) {
    this.grandTotal = 0;
    if (array  !== null && array !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < array.length; i++) {
        this.grandTotal = this.grandTotal + parseFloat(array[i].TotalPrice);
      }
    }
  }

placeOrder(){
  this.addressflag = true;
}

  confirmOrder() {
    // tslint:disable-next-line:no-debugger
    if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
      this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
      this.loginDetail = JSON.parse(sessionStorage.getItem('LoginDetails'));

      this.order.amount = this.grandTotal;
      this.order.orderedOn = new Date();
      this.order.shippingAddress = this.shippingAddress.Address1;
      this.order.orderStatus = 'payment pending';
      this.CustomerId = this.loginDetail.custId;

      this.orderService.MakeNewOrder(this.order,this.CustomerId).subscribe(
        result => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.cartListItem.length; i++) {
            this.orderDetail.prodId = this.cartListItem[i].ProductId;
            this.orderDetail.quantity = this.cartListItem[i].Quantity;
            this.orderDetail.totalPrice = this.cartListItem[i].TotalPrice;
            this.orderDetail.price = this.cartListItem[i].UnitPrice;
            this.orderDetail.prodName = this.cartListItem[i].ProductName;
            this.orderDetail.comments = 'order in process';

            this.orderService.InsertOrderDetails(this.orderDetail , result.orderId).subscribe(data => {

            });
          }
          this.productService.sendCartList(null);
          sessionStorage.removeItem('CartList');
          this.router.navigate(['/order-list']);
        },
        error => console.error(error)
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/cart-list']);
  }
}
