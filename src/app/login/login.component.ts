import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';
import CustomerService from '../Shared/api/customer.service';
import M_Customer from '../Shared/models/Customer';
import { BlockUI, NgBlockUI} from 'ng-block-ui';

import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import ProductService from '../Shared/api/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CustomerService]
})
export class LoginComponent implements OnInit, OnDestroy {
  @BlockUI()
    
  blockUI: NgBlockUI;
  sub: Subscription;
  customer: M_Customer = new M_Customer();
  username: string;
  password: string;

  loginForm: FormGroup;
 
  constructor(private router: Router,
              private route: ActivatedRoute, 
              private productService: ProductService,
              private customerService: CustomerService,
              private formBuilder : FormBuilder) { }





  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});

    this.loginForm = this.formBuilder.group({
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
     
    });
  }

  login(): void {

    if (this.username === 'admin' && this.password === 'admin') {
     
    } else if (this.loginForm.value.Email !== null && this.loginForm.value.Password !== undefined) {
      this.customer.custEmail = this.loginForm.value.Email;
      this.customer.password = this.loginForm.value.Password;
      this.customerService.checkCustomerLogin(this.customer.custEmail,this.customer.password).subscribe(
        result => {
          sessionStorage.setItem('LoginDetails', JSON.stringify(result));
          this.productService.sendUserDetails(result);
         this.gotoList();
        },
        error => console.error(error)
      );
    } else {
      alert('Invalid credentials');
    }
  }
  gotoList() {
    this.router.navigate(['product-shop']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
