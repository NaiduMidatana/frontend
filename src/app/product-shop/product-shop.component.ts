import { Component, OnInit } from '@angular/core';
import SearchProduct from '../Shared/models/SearchProduct';
import ProductService from '../Shared/api/product.service';
import ProductDetails from '../Shared/models/ProductDetails';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { MatAutocomplete } from '@angular/material';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';


@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit {
  searchProduct: SearchProduct = new SearchProduct();
  products: any = [];
  constructor(private productService: ProductService,
              private sanitizer : DomSanitizer) { }
  selectedCategory: any = 'home';

  category: any =[];
  image:any = [];
  imgData : any = [];
  images : any = [];
  

  ngOnInit() {
 
    this.productService.getAllImages().subscribe(data =>{
      this.imgData = data;
      console.log(this.imgData)
    });


     this.productService.geAllCategory().subscribe(data => {
       this.category = data;
       console.log(this.category);
     });

    

    }

    filterProduct(selected : any){
      console.log(selected);
      this.imgData = [];
 this.productService.getProductByCatId(selected.value).subscribe(data =>{
   console.log(data);
   this.products= data; 

   this.products.forEach((product1)=>this.productService.getImageByProductId(product1.prodId).subscribe(res => 
    {  console.log(res);
           this.imgData.push(res);
         //let objectURL = 'data:image/jpg;base64,' + this.imgData.picByte;
         //this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

           //console.log(this.imgData);
    }))
 })
    }




}
