import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import OrderService from '../Shared/api/order.service';
import SearchOrder from '../Shared/models/SearchOrder';
import { MatTableDataSource, MatPaginator, MatSort, MatBottomSheet } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService]
})
export class OrderListComponent implements OnInit, OnDestroy {
  orderMaster: any;
  search: SearchOrder = new SearchOrder();
  logindetails: any;
  displayedColumns: string[] = ['CustomerName', 'OrderId', 'OrderDate', 'ShippingAddress','Amount', 'Action'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  CustomerId: any;
  constructor(private route: ActivatedRoute
    , private router: Router
    , private orderService: OrderService
    , private bottomSheet: MatBottomSheet) { }
  sub: Subscription;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
      this.logindetails = JSON.parse(sessionStorage.getItem('LoginDetails'));

      this.CustomerId=this.logindetails.custId;
      this.orderService.GetOrderList(this.CustomerId).subscribe(orderList=>{
        this.orderMaster = orderList;
        this.dataSource = new MatTableDataSource(this.orderMaster);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    } else {
      this.router.navigate(['/login']);
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBottomSheet(orderId): void {
    this.bottomSheet.open(OrderDetailsComponent,{
      data: { OrderId: orderId },
      ariaLabel: "Jitendra Dubey",
      panelClass: 'custom-width-modal',
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
