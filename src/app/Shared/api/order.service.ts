import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import { Observable } from 'rxjs';
import SearchOrder from '../models/SearchOrder';
import OrderList from '../models/OrderList';

@Injectable()
export default class OrderService {
    public API = 'http://localhost:8080/api/v1';
  

    public ORDER_SAVEAPI = `${this.API}/orders`;

    public ORDER_DETAPI = `${this.API}/orders`;

    constructor(private http: HttpClient) {}

    MakeNewOrder(order: Order , custId : String) {
        let result: Observable<Order>;
        if (order) {
            result = this.http.post<Order>(`${this.ORDER_SAVEAPI}/${custId.toString()}/customer`, order);
        }
        return result;
    }

    InsertOrderDetails(order: OrderDetail , orderId : string) {
        let result: Observable<OrderDetail>;
        if (order) {
            result = this.http.post<OrderDetail>(`${this.ORDER_DETAPI}/${orderId}/orderdetails`, order);
        }
        return result;
    }

    GetOrderList(custId : String) {
        return this.http.get(`${this.ORDER_SAVEAPI}/${custId}`);
    }

    GetOrderDetails(orderId : String){
        return this.http.get(`${this.ORDER_DETAPI}/${orderId}/orderdetails`);
    }
}
