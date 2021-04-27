import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  username:string;
  userid:any;
  LoremIpsum: any;
  LoremIpsum1: any;
  LoremIpsum2: any;
  LoremIpsum3: any;
}

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  displayedColumns: string[] = ['username', 'userid', 'LoremIpsum', 'LoremIpsum1', 'LoremIpsum2','LoremIpsum3'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  constructor() { }

  ngOnInit(): void {
  }

}
