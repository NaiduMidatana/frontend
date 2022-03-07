import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import ProductService from './Shared/api/product.service';
import CustomerService from './Shared/api/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  title = 'OnlineShopping';
  userDetails: any;
  sub: Subscription;
  WelcomeMessage: string;
  adminFlag = false; 
  cartCount: any;
  constructor(private route: ActivatedRoute, private router: Router, private productService : ProductService, private customerService : CustomerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params)
    });   
    this.productService.receiveCartList().subscribe((cartData => {
      this.cartCount = cartData;
    }));

    this.productService.receiveUserDetails().subscribe((userDetails => {
      this.userDetails = userDetails;
      if(userDetails.custEmail === 'admin@gmail.com'){
        this.adminFlag = true;
       }else{
         this.adminFlag = false;
       }
       this.router.navigate(['product-shop']);
    }))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    sessionStorage.removeItem('LoginDetails');
    this.userDetails = null;
    this.adminFlag = false;
    sessionStorage.removeItem('CartList');
    this.router.navigate(['/login']);
  }
}
