import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import CustomerService from '../Shared/api/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import SearchAddress from '../Shared/models/SearchAddress';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
  providers: [CustomerService]
})
export class AddressListComponent implements OnInit {
  customer: [];
  search:SearchAddress=new SearchAddress();
  sub: Subscription;
  logindetails: any;
  displayedColumns: string[] = ['select', 'Name', 'Address1', 'Address2', 'LandMark','Pincode','ContactNo', 'Action'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: ActivatedRoute, private custService: CustomerService, private router: Router) { }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {});
    // if (sessionStorage.getItem('LoginDetails') !== null && sessionStorage.getItem('LoginDetails') !== undefined) {
    //   this.logindetails = JSON.parse(sessionStorage.getItem('LoginDetails'));
    //   this.search.CustomerId = this.logindetails.CustomerId;
    //   this.custService.GetAllAddress(this.search).subscribe(data => {
    //     //this.customer = data ;
    //     this.dataSource = new MatTableDataSource<any>(data as any);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   });
    // }else {
    //   this.router.navigate(['/login']);
    // }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.BillingAddressId + 1}`;
  }
  
}
