import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatIconModule,
  MatGridListModule,
  MatMenuModule,
  MatTabsModule,
  MatSelectModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatBottomSheetModule,
} from '@angular/material';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import EmployeeService from './shared/api/employee.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import ProductService from './Shared/api/product.service';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddressListComponent } from './address-list/address-list.component';

import { OrderDetailsComponent } from './order-details/order-details.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { BlockUI, BlockUIModule } from 'ng-block-ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import CustomerService from './Shared/api/customer.service';
import OrderService from './Shared/api/order.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/product-shop', pathMatch: 'full' },
 
  
  {
    path: 'product-add',
    component: ProductAddComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product-shop',
    component: ProductShopComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'product-edit/:id',
    component: ProductAddComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: CustomerAddComponent
  },
  {
    path: 'register/:id',
    component: CustomerAddComponent
  },
  {
    path: 'cart-list',
    component: CartListComponent
  },
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'edit-profile',
    component: EditCustomerComponent
  },
  {
    path: 'order-list',
    component: OrderListComponent
  },
  {
    path: 'address-list',
    component: AddressListComponent
  },

  {
    path: 'order-details',
    component: OrderDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerAddComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductShopComponent,
    ProductDetailComponent,
    CartListComponent,
    OrderListComponent,
    AddressListComponent,

    OrderDetailsComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{enableTracing: true}),
    BlockUIModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    MatFormFieldModule

  ],
  providers: [EmployeeService, ProductService, CustomerService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
