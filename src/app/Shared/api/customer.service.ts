import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import M_Customer from '../models/Customer';
import { Observable, Subject } from 'rxjs';
import SearchAddress from '../models/SearchAddress';


@Injectable()
export default class CustomerService {
    public API = 'http://localhost:8080/api/v1';
    // public API = 'http://10.22.28.5:1993/api';
    public CUSTOMER_API = `${this.API}/customerslist`;
    public CUSTOMER_SAVEAPI = `${this.API}/customer`;
    public userDetails$ : Subject<any> = new Subject();
   
    public CUSTOMER_LOGINAPI = `${this.API}/CheckCustomerLogin`;

    constructor(private http: HttpClient) {}

    


    checkCustomerLogin55(customer: M_Customer) {
        let result: Observable<M_Customer>;
        if (customer) {
            result = this.http.post<M_Customer>(`${this.CUSTOMER_LOGINAPI}`, customer);
        }
        return result;
    }
   

    getCustomer() {
        return this.http.get(`${this.CUSTOMER_API}`);
    }

    save(Request : any){
        return this.http.post<object>(`${this.CUSTOMER_SAVEAPI}`, Request);
    }

    updateCustomer(custId : string,customer : any ){
        return this.http.put(`${this.CUSTOMER_SAVEAPI}/${custId.toString()}`,customer)
    }


    checkCustomerLogin(email,password){
        return this.http.get(`${this.API}/customers/${email.toString()}/${password.toString()}`);
    }

    receiveUserDetails() {
        return this.userDetails$.asObservable();
    }
    
    sendUserDetails(userDetails) {
        this.userDetails$.next(userDetails);
    }
   
}
