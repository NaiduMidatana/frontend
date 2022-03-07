import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import ProductDetails from '../Shared/models/ProductDetails';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import ProductService from '../Shared/api/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import SearchProduct from '../Shared/models/SearchProduct';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnDestroy {

@BlockUI() blockUI : NgBlockUI;
  constructor(private formBuilder: FormBuilder,
             private productService: ProductService,
             private route: ActivatedRoute,
             private router : Router,
             private http: HttpClient) {
      
      this.BindDropDownList();
    }

  @Output() public onUploadFinished = new EventEmitter();
  // tslint:disable-next-line:member-ordering
  product: ProductDetails = new ProductDetails();
  // tslint:disable-next-line:member-ordering
  searchProduct: SearchProduct = new SearchProduct();
  // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:member-ordering
  firstFormGroup: FormGroup;
  addProductForm : FormGroup;
  upload : boolean = false;
  selectedFile: File =null;
  newproduct: any;
  // tslint:disable-next-line:member-ordering
  sub: Subscription;
  // tslint:disable-next-line:member-ordering
  categoryList: any;

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onFileChanged(event)
  {
    this.selectedFile = event.target.files[0];
    this.upload = true;
  }


  BindDropDownList() {
    this.productService.geAllCategory().subscribe((category: any) => {
      if (category) {
        this.categoryList = category;
      } else {
        console.log(
          `Category not returning the list`
        );
      }
    });

   
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        //this.searchProduct.ProductId = id;
        this.productService.GetAllProductList().subscribe((productDetail: any) => {
          if (productDetail) {
            this.product = productDetail[0];
            //this.urls = this.product.ProductImage;
          } else {
            console.log(
              `Product with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });

    this.addProductForm = this.formBuilder.group({
      ProductName: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      AvailableQuantity : new FormControl('',Validators.required),
      ProductId:new FormControl(),
      CategoryId: new FormControl('', Validators.required),
      ProductPrice : new FormControl('',Validators.required )

    });
  }

productDetails(){
  const productDetails={
    prodName:this.addProductForm.value.ProductName,
    price : this.addProductForm.value.ProductPrice,
    description : this.addProductForm.value.Description,
    availableQuantity : this.addProductForm.value.AvailableQuantity
  }
  return productDetails;
}
  
  SaveProductDetails() {
    this.blockUI.start();
      const catid = this.addProductForm.value.CategoryId;
      const buildProductDetails = this.productDetails();
      this.productService.addProductByCatId(catid,buildProductDetails).subscribe(data => {
        console.log(data);
        this.newproduct = data; //return the current added item
        this.onUpload(); //add the image
        setTimeout(() => {
          this.blockUI.stop();
          Swal.fire({
            title: 'Success',
            text: 'Product Added Successfully!',
            icon: 'success',
            showCancelButton: false,
            allowOutsideClick: false
          }).then((result) => {
           this.blockUI.stop();
           this.gotoList();
          });
        }, 3000);
        
      },
      error => console.log(error));
  
      
    
    
  }
  onUpload()
  {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('prodImage', this.selectedFile, this.selectedFile.name);
    this.productService.addProductImage(this.newproduct.prodId, uploadImageData).subscribe(data =>
      {
        console.log(data);
      });
    
  }
  gotoList() {
    this.router.navigate(['/product-list']);
  }


}



