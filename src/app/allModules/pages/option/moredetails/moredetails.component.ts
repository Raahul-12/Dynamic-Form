import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  emp: any;
  Name: string;
  response: any;
}

@Component({
  selector: 'app-moredetails',
  templateUrl: './moredetails.component.html',
  styleUrls: ['./moredetails.component.scss']
})
export class MoredetailsComponent implements OnInit {
  displayedColumns: string[] = ['emp', 'Name', 'response'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  constructor() { }

  ngOnInit(): void {
  }

}
