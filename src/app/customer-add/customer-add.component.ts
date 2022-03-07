import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import CustomerService from '../Shared/api/customer.service';
import M_Customer from '../Shared/models/Customer';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
  providers: [CustomerService]
})
export class CustomerAddComponent implements OnInit, OnDestroy {
  @BlockUI()
    
  blockUI: NgBlockUI;
  sub: Subscription;
  addCustomerForm : FormGroup;
  customer: M_Customer = new  M_Customer();
  // customer = {CustomerId: 0, CustomerName: '', MobileNo: '', EmailId: '', Password: '', ConfirmPassword: ''};
  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.customerService.getCustomer().subscribe((cust: any) => {
          if (cust) {
            this.customer = cust[0];
            this.customer.ConfirmPassword = cust[0].Password;
          } else {
            console.log(
              `Product with id '${id}' not found, returning to list`
            );
          }
        });
      }
    });
    this.addCustomerForm = this.formBuilder.group({
      CustomerName: new FormControl('', Validators.required),
      MobileNo: new FormControl('', Validators.required),
      EmailId : new FormControl('',Validators.required),
      custAddress:new FormControl(),
      Password: new FormControl('', Validators.required),
      ConfirmPassword : new FormControl('',Validators.required )

    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/login']);
  }

  save(form: any) {
    this.blockUI.start();
    const customerDetailsbuild = this.buildCustomerDetails();
    this.sub = this.customerService.save(customerDetailsbuild).subscribe(
      result => {
        setTimeout(() => {
          this.blockUI.stop();
          Swal.fire({
            title: 'Thank you',
            text: 'Registration Done Successfully!',
            icon: 'success',
            showCancelButton: false,
            allowOutsideClick: false
          }).then((result) => {
            this.gotoList();
          });
        
        }, 5000);
       
       
      },
      error => console.error(error)
    );
  }
  buildCustomerDetails(){
    const customerDetails = {
                custName : this.addCustomerForm.value.CustomerName,
                custEmail : this.addCustomerForm.value.EmailId,
                custPhn : this.addCustomerForm.value.MobileNo,
                custAddress : this.addCustomerForm.value.custAddress,
                password : this.addCustomerForm.value.Password

    }
    return customerDetails

  }
}
