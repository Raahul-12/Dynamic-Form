import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApexFill, ApexLegend, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { MoredetailsComponent } from './moredetails/moredetails.component';
// import { MoredetailsComponent } from '../moredetails/moredetails.component';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  public chartOptions: ChartOptions;

  constructor(private router: Router,public dialog: MatDialog) { 
    this.chartOptions = {
      series: [44, 55],
      chart: {
        type: "donut"
      },
      labels: ["Option 1", "Option 2"],
      legend: {
        position: "bottom",
        show:false,
      },
      fill: {
        colors: ['#26009c', '#00ba53']
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom",
              show:false,
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(MoredetailsComponent,
     { height: '580px',
      width: '1000px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  details(){
    this.router.navigate(['moredetails']);
  }

}
