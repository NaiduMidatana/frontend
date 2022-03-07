import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import Customer from '../Shared/models/Customer';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import CustomerService from '../Shared/api/customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  customer: Customer[];
  sub: Subscription;
  displayedColumns: string[] = ['select', 'CustomerName', 'MobileNo', 'EmailId', 'Password', 'Action'];
  dataSource ;
  selection = new SelectionModel<Customer>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private route: ActivatedRoute, private custService: CustomerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    this.custService.getCustomer().subscribe(data => {
      console.log(data);
      this.customer = data as Customer[];
      this.dataSource = new MatTableDataSource<Customer>(this.customer);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
  checkboxLabel(row?: Customer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.custId + 1}`;
  }
}
