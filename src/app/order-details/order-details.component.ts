import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import OrderService from '../Shared/api/order.service';
import SearchOrder from '../Shared/models/SearchOrder';
import OrderList from '../Shared/models/OrderList';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService]
})
export class OrderDetailsComponent implements OnInit {
  order: OrderList = new OrderList();
  orderMaster:any;
  orderProduct : any = [];
  search: SearchOrder = new SearchOrder();
  sub: Subscription;
  grandTotal:number=0;
  logindetails: any;
  CustomerId: any;
  OrderId: any;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public orderdata: any
  , private route: ActivatedRoute
  , private router: Router
  , private orderService: OrderService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
      this.logindetails = JSON.parse(sessionStorage.getItem('LoginDetails'));

      this.CustomerId = this.logindetails.custId;
      this.OrderId = this.orderdata.OrderId;
  
      this.orderService.GetOrderDetails(this.OrderId).subscribe(orderDetailsList=>{
        this.orderMaster = orderDetailsList;
     
        this.orderProduct = orderDetailsList;
      
        for (let i =0 ;i<this.orderProduct.length;i++){
          this.grandTotal=this.grandTotal+ this.orderProduct[i].totalPrice;
        }
      })

    } else {
      this.router.navigate(['/login']);
    }
  }

}
