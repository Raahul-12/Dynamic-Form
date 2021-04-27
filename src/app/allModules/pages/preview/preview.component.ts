import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, TransitionCheckState } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogData } from 'app/notifications/notification-dialog/dialog-data';
export interface PeriodicElement {
  SI: any;
  Name: string;
  LoremIpsum: any;
}
export interface PeriodicElement1 {
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  state: any;
}
const ELEMENT_DATA: PeriodicElement1[] = [
  { state: '1', option1: ' ', option2: ' ', option3: ' ', option4: ' ' },
  { state: '1', option1: '', option2: '', option3: '', option4: '' },
  { state: '1', option1: '', option2: '', option3: '', option4: '' }
]
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  displayedColumns: string[] = ['SI', 'Name', 'LoremIpsum', 'LoremIpsum', 'LoremIpsum'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  displayedColumns1: string[] = ['state', 'option1', 'option2', 'option3', 'option4'];
  // dataSource1 = new MatTableDataSource<PeriodicElement1>();
  dataSource1 = ELEMENT_DATA;
  header: any;
  form: FormGroup;
  imageurl: any;
  Headerflag: boolean = true;
  flagImage: boolean = true;
  choicetitle: any;
  descflag: boolean = true;
  checkquestion: any;
  checktitle: any;
  constructor(private router: Router, private fb: FormBuilder, public dialogRef: MatDialogRef<PreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form = this.fb.group({
      title: ['', Validators.required],
    });
    console.log(data);
    let data1: any = data;
    if (data1.Header == "") {
      this.Headerflag = false;
    }
    if (data1.Image == undefined) {
      this.flagImage = false;
    }
    if (data1.Description == "") {
      this.descflag = false;
    }
    if (data1.Check[0].Question != "") {
      this.checkquestion = data1.Check[0].Question
      for(let i=0;i<data1.Check[0].Options.length;i++){
        this.checktitle = data1.Check[0].Options[i].Title;
      }
    }
    // if(data1.Choice !== ""){
    //   for(let i = 0;i<data1.Choice[0].Options.length;i++){
    //     this.choicetitle = data1.Choice[0].Options[i].Title;
    //   }
    // }

  }

  ngOnInit(): void {

    // this.flagImage= false;
    // if()
    // var getdata = JSON.parse(localStorage.getItem("new_formdata"));
    // this.imageurl = JSON.parse(localStorage.getItem("headerurl"));

    // console.log(getdata);
    // console.log(this.imageurl);

    // this.header = getdata.Header;

  }
  backbtn() {
    // this.router.navigate(['/pages/newform']);
    this.dialogRef.close();
  }

}
