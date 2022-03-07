import { Component, OnInit, ViewChild } from '@angular/core';
import ProductDetails from '../Shared/models/ProductDetails';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import ProductService from '../Shared/api/product.service';
import SearchProduct from '../Shared/models/SearchProduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDetails[];
  searchProduct: SearchProduct = new SearchProduct();
  displayedColumns: string[] = ['select', 'ProductName', 'CategoryName','Quantity', 'ProductPrice', 'Action'];
  dataSource = new MatTableDataSource<ProductDetails>();
  selection = new SelectionModel<ProductDetails>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.GetAllProductList().subscribe(data => {
      console.log(data);
      this.products = data as unknown as ProductDetails[];
      this.dataSource = new MatTableDataSource<ProductDetails>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ProductId + 1}`;
  }
}
