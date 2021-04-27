import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserWithRole } from 'app/models/master';
import { AddQuestionGroup, AddQ_project_GroupMap, AnswerType, Question, Q_Projects } from 'app/models/project';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/snackbar-status-enum';
import { hasIn } from 'lodash';
import { StarRatingComponent } from 'ng-starrating';
import { UploaderOptions, UploadInput, UploadOutput } from 'ngx-uploader';
import { Answer } from '../../../models/project';
import { PreviewComponent } from '../preview/preview.component';
import { PreviewService } from '../preview/preview.service';

export interface PeriodicElement {
  name: string;
  position: any;
  weight: any;
  symbol: string;
  addicon: any;
}
export class PageData {
  Page: number;
  FormData: FormGroup;
}
export interface likertElement {
  name: string;
  // position: any;
  option1: any;
  option2: string;
  option3: string;
  option4: any;
  addicon: any;
}
const LIKERT_DATA: likertElement[] = [
  { name: 'statement1', option1: 'option1', option2: 'H', option3: 'option3', option4: '', addicon: '' }
];

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'pos', name: 'name', weight: 'weight', symbol: 'symbal', addicon: '' }
];


@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {
  // headertext = "Header Text"
  tabs = ['Page 1'];
  SelectedTab: number = 0;
  MultiplePages: PageData[] = [];
  spin:boolean = false;
  AllInputFormGroup: FormGroup;
  SubTagFormGroup: FormGroup;
  SubOptionFormGroup: FormGroup;
  SubDateFormGroup: FormGroup;
  SubTimeFormGroup: FormGroup;
  // DynamicFields:FormArray;
  uploadInput: EventEmitter<UploadInput>;
  upload: any;
  customSwitch2: boolean = false
  showremovebtn: boolean = false;
  flagupload: boolean = false;
  files1: any = [];
  filename: any;
  commonfilename: any;
  dragOver: boolean;
  selected = new FormControl(0);
  options: UploaderOptions;
  commonflagupload: boolean = false;
  descriptionfilename: any;
  descriptionflagupload: boolean = false;
  choicefilename: any;
  choiceflagupload: boolean = false;
  checkboxfilename: any;
  imagearr = [];
  checkboxflagupload: boolean = false;
  datefilename: any;
  dateflagupload: boolean = false;
  timefilename: any;
  timeflagupload: boolean = false;
  attachmentfilename: any;
  attachmentflagupload: boolean = false;
  attach2filename: any;
  attach2flagupload: boolean = false;
  ratingsfilename: any;
  ratingsflagupload: boolean = false;
  netpromofilename: any;
  snackbar: NotificationSnackBarComponent
  netpromoflagupload: boolean = false;
  likertfilename: any;
  likertflagupload: boolean = false;

  Headerurl: any;

  isChoiceMulitiple: boolean = false;
  AllForm: FormGroup;
  questiongrp: AddQuestionGroup[] = [];
  Q_Project: Q_Projects[] = [];
  questiongrpmap: AddQ_project_GroupMap[] = [];
  questions: Question[] = [];



  constructor(private _form: FormBuilder, private router: Router, public dialog: MatDialog, private service: PreviewService, private snackBar: MatSnackBar) {
    this.snackbar = new NotificationSnackBarComponent(this.snackBar)
  }
  ngOnInit(): void {
    this.MultiplePages = [];
    this.InitializFormGroup();

  }
  likertColumns: string[] = ['name', 'option1', 'option2', 'option3', 'option4', 'addicon'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'addicon'];

  dataSource = ELEMENT_DATA;
  columnsToDisplay1: string[] = this.displayedColumns.slice();
  likertdataSource = new MatTableDataSource(LIKERT_DATA);
  columnsToDisplay: string[] = this.likertColumns.slice();
  files: File[] = [];


  TabClicked(event: any): void {


    let data = new PageData();
    let PeriviousTab = this.SelectedTab;
    this.SelectedTab = event.index;
    data.Page = PeriviousTab;
    data.FormData = this.AllForm;
    let isavailable = false;
    let index = 0;

    let i = 0;
    let isTrue = false;
    let Formdata = new FormGroup({});
    this.MultiplePages.forEach(x => {
      if (x.Page == event.index) {
        isTrue = true;
        Formdata = x.FormData;
      }
    });
    this.MultiplePages.forEach(x => {
      if (x.Page == data.Page) {
        isavailable = true;
        index = i;
      }
      i++;
    });
    if (!isavailable) {
      this.MultiplePages.push(data);

      if (!isTrue) {
        this.InitializFormGroup();
      }
      else {
        this.AllForm = Formdata;

      }
    }
    else {
      this.MultiplePages[index] = data;

      if (!isTrue) {
        this.InitializFormGroup();
      }
      else {
        this.AllForm = Formdata;

      }

    }
    console.log(this.MultiplePages);

  }
  addColumn_table() {
    this.columnsToDisplay1.splice(this.columnsToDisplay1.length - 1, 0, "New" + (this.columnsToDisplay1.length - 1));

  }
  addrow_tabel() {
    let copyobj = Object.assign({}, ELEMENT_DATA[ELEMENT_DATA.length - 1])
    ELEMENT_DATA.push(copyobj);

    this.dataSource = ELEMENT_DATA;
  }
  addRow_likert() {
    let copyobj = Object.assign({}, LIKERT_DATA[LIKERT_DATA.length - 1])
    LIKERT_DATA.push(copyobj);
    for (var i = 0; i < LIKERT_DATA.length; i++) {
      LIKERT_DATA[i].name = "statement" + (i + 1);
    }

    this.likertdataSource = new MatTableDataSource(LIKERT_DATA);

  }

  preview() {
    console.log(this.AllForm.value);
    this.AllForm.get('Image').patchValue(this.Headerurl);

    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '90%',
      height: '90%',
      data: this.AllForm.value


    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });



  }
  AddColumn_likert() {
    this.columnsToDisplay.splice(this.columnsToDisplay.length - 1, 0, "option" + (this.columnsToDisplay.length - 1));

  }
  MultipleAnswer() {
    this.isChoiceMulitiple = !this.isChoiceMulitiple;
  }


  InitializFormGroup() {

    this.AllForm = this._form.group({
      Header: ['', Validators.required],
      Description: ['', Validators.required],
      Image: '',
      Tabel: this._form.array([
        // this.TableSection(),
      ]),
      Choice: this._form.array([
        //  this.ChoiceSection(),
      ]),
      Check: this._form.array([
        //  this.CheckSection(),
      ]),
      Date: this._form.array([
        // this.DateSection(),
      ]),
      Time: this._form.array([
        // this.TimeSection(),
      ]),
      Attachment: this._form.array([
        // this.AttachmentSection(),
      ]),
      Rating: this._form.array([
        // this.RatingSection(),
      ]),
      Score: this._form.array([
        // this.ScoreSection(),
      ]),
      Likert: this._form.array([
        // this.LikertSection(),
      ]),
    });
  }
  TableSection() {
    return this._form.group({
      Title: '',
      // sectionDescription: new FormControl('')
    })
  }


  ChoiceSection() {
    return this._form.group({
      Question: 'Question',
      MultipleAnswer: false,
      Required: false,
      SuffleOption: false,
      Dropdown: false,
      SubTitle: false,
      Options: this._form.array([
        this.OptionSection(),
      ]),
      // sectionDescription: new FormControl('')
    })
  }
  OptionSection() {
    return this._form.group({
      Title: '',
      // sectionDescription: new FormControl('')
    })
  }
  onChange(e) {
    alert(e.checked);
    this.customSwitch2 = e.checked
  }
  CheckSection() {
    return this._form.group({
      Question: 'Question',
      Required: this.customSwitch2,
      Options: this._form.array([
        this.OptionSection(),
      ]),
    })
  }
  DateSection() {
    return this._form.group({
      Question: 'Question',
      Required: false,
      Options: this._form.array([
        this.OptionSection(),
      ]),
    })
  }
  TimeSection() {
    return this._form.group({
      Question: 'Question',
      Required: false,
      Options: this._form.array([
        this.OptionSection(),
      ]),
    })
  }
  AttachmentSection() {
    return this._form.group({
      Title: '',
      // sectionDescription: new FormControl('')
    })
  }
  RatingSection() {
    return this._form.group({
      Question: 'Question', Required: false,
      Options: this._form.array([
        this.OptionSection(),
      ]),
    })
  }
  ScoreSection() {
    return this._form.group({
      Question: 'Question', Required: false,
      Options: this._form.array([
        this.OptionSection(),
      ]),
    })
  }
  LikertSection() {
    return this._form.group({
      Title: '',
      // sectionDescription: new FormControl('')
    })
  }
  getSection(form: any, FAName: string) {
    //  console.log(form,FAName);

    return (form.get(FAName) as FormArray).controls;
  }
  addoption(i: any, FAName: string) {
    const control = ((this.AllForm.get(FAName) as FormArray).controls[i].get('Options') as FormArray).controls;
    control.push(this.OptionSection());
  }
  addSection(i: any) {
    if (i == 2) {
      const control = ((this.AllForm.get('Choice') as FormArray).controls);
      control.push(this.ChoiceSection());
    }
    if (i == 3) {
      const control = ((this.AllForm.get('Check') as FormArray).controls);
      control.push(this.CheckSection());
    }
    if (i == 5) {
      const control = ((this.AllForm.get('Date') as FormArray).controls);
      control.push(this.DateSection());
    }
    if (i == 4) {
      const control = ((this.AllForm.get('Time') as FormArray).controls);
      control.push(this.TimeSection());
    }
    if (i == 6) {
      const control = ((this.AllForm.get('Attachment') as FormArray).controls);
      control.push(this.AttachmentSection());
    }
    if (i == 7) {
      const control = ((this.AllForm.get('Rating') as FormArray).controls);
      control.push(this.RatingSection());
    }
    if (i == 8) {
      const control = ((this.AllForm.get('Score') as FormArray).controls);
      control.push(this.ScoreSection());
    }
    if (i == 9) {
      const control = ((this.AllForm.get('Likert') as FormArray).controls);
      control.push(this.LikertSection());
    }
    if (i == 1) {
      const control = ((this.AllForm.get('Tabel') as FormArray).controls);
      control.push(this.TableSection());
    }

  }
  //mounika end

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(event.addedFiles);
  }
  // favoriteSeason: string;
  // seasons: string[] = ['Winter', 'Spring'];
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  addTab(selectAfterAdding: boolean) {
    let count = this.tabs.length + 1;
    this.tabs.push('Page ' + count);

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }


  RemoveItem(FormArray: string, i: any, k: any) {

    ((this.AllForm.get(FormArray) as FormArray).controls[i].get('Options') as FormArray).removeAt(k);

  }

  remove() {
    this.flagupload = false;
    this.filename = ''
  }
  commonnameremove() {
    this.commonflagupload = false;
    this.commonfilename = '';
    this.Headerurl = undefined;
  }
  descremove() {
    this.descriptionflagupload = false;
    this.descriptionfilename = '';
  }
  choiceremove() {
    this.choiceflagupload = false;
    this.choicefilename = ''
  }
  checkboxremove() {
    this.checkboxflagupload = false;
    this.checkboxfilename = ''
  }
  dateremove() {
    this.dateflagupload = false;
    this.datefilename = ''
  }
  timeremove() {
    this.timeflagupload = false;
    this.timefilename = ''
  }
  attachmentremove() {
    this.attachmentflagupload = false;
    this.attachmentfilename = ''
  }
  attach2remove() {
    this.attach2flagupload = false;
    this.attach2filename = ''
  }
  ratingsremove() {
    this.ratingsflagupload = false;
    this.ratingsfilename = ''
  }
  netpromoremove() {
    this.netpromoflagupload = false;
    this.netpromofilename = ''
  }
  likertremove() {
    this.likertflagupload = false;
    this.likertfilename = ''
  }

  handleFileInput(files: any) {
    this.filename = files.target.files[0].name;
    this.flagupload = true;
    files.target.value = null;
  }
  commonnameFileInput(files: any) {
    this.commonfilename = files.target.files[0].name;
    this.commonflagupload = true;
    //  files.target.value = null;
    // const reader = new FileReader();
    var reader = new FileReader();
    reader.readAsDataURL(files.target.files[0]);
    reader.onload = (event: any) => {
      this.Headerurl = event.target.result;
      // this.AllForm.controls["Image"].setValue = this.Headerurl;
      // console.log(this.AllForm.value);

      // this.AllForm.get('')
      //  localStorage.setItem("headerurl",this.Headerurl);
      //  console.log(this.Headerurl);
      //  console.log(this.AllForm.value);



      // this.imagearr.push(this.Headerurl);
      // var abc1 = JSON.parse(localStorage.getItem("new_formdata"));
      // abc.Image = this.Headerurl;

    };
    // this.Headerurl = files.target.result; 

  }
  descriptionFileInput(files: any) {
    this.descriptionfilename = files.target.files[0].name;
    this.descriptionflagupload = true;
    files.target.value = null;
  }
  choiceFileInput(files: any) {
    this.choicefilename = files.target.files[0].name;
    this.choiceflagupload = true;
    files.target.value = null;
  }
  checkboxFileInput(files: any) {
    this.checkboxfilename = files.target.files[0].name;
    this.checkboxflagupload = true;
    files.target.value = null;
  }
  dateFileInput(files: any) {
    this.datefilename = files.target.files[0].name;
    this.dateflagupload = true;
    files.target.value = null;
  }
  timeFileInput(files: any) {
    this.timefilename = files.target.files[0].name;
    this.timeflagupload = true;
    files.target.value = null;
  }
  attachmentFileInput(files: any) {
    this.attachmentfilename = files.target.files[0].name;
    this.attachmentflagupload = true;
    files.target.value = null;
  }
  attach2FileInput(files: any) {
    this.attach2filename = files.target.files[0].name;
    this.attach2flagupload = true;
    files.target.value = null;
  }
  ratingsFileInput(files: any) {
    this.ratingsfilename = files.target.files[0].name;
    this.ratingsflagupload = true;
    files.target.value = null;
  }
  netpromoFileInput(files: any) {
    this.netpromofilename = files.target.files[0].name;
    this.netpromoflagupload = true;
    files.target.value = null;
  }
  likertFileInput(files: any) {
    this.likertfilename = files.target.files[0].name;
    this.likertflagupload = true;
    files.target.value = null;
  }




  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.flagupload = true;
          this.filename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  commonnameUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.commonflagupload = true;
          this.commonfilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  DescriptionUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.commonflagupload = true;
          this.commonfilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  choiceUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.choiceflagupload = true;
          this.choicefilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  checkboxUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.checkboxflagupload = true;
          this.checkboxfilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  dateUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.dateflagupload = true;
          this.datefilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  timeUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.timeflagupload = true;
          this.timefilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  attachmentUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.attachmentflagupload = true;
          this.attachmentfilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  attach2UploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.attach2flagupload = true;
          this.attach2filename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  ratingsUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.ratingsflagupload = true;
          this.ratingsfilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  netpromoUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.netpromoflagupload = true;
          this.netpromofilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  likertUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.likertflagupload = true;
          this.likertfilename = output.file.name;
          // this.showremovebtn = true;
        }
        break;
    }
  }
  postdata() {
    this.spin = true;
    let abc: Q_Projects = new Q_Projects();
    abc.Name = this.AllForm.get('Header').value;
    this.service.postdatatoQ_Project(abc).subscribe((a: any) => {
      this.Q_Project.push(a);
      console.log("Q_Project", this.Q_Project);
      let q_project: Q_Projects = a;
      // this.Q_Project.forEach(h => {


      let abc1: AddQuestionGroup = new AddQuestionGroup();
      abc1.Language = "Low";
      this.service.postdatatoQuestionGroups(abc1).subscribe((quegrp: any) => {
        let group: AddQuestionGroup = quegrp;
        console.log("questiongrp", group);

        // this.questiongrp.push(a);
        // console.log("questiongrp", this.questiongrp);

        // this.questiongrp.forEach(k => {
        let map: AddQ_project_GroupMap = quegrp;
        map.Language = map.Language;
        map.ProjectID = q_project.ProjectID;
        map.QGID = map.QGID;

        //Map//         
        this.service.postdatatoQ_Project_Group_Map(map).subscribe((a: any) => {

          this.questiongrpmap.push(a);

          console.log("Q_Project_Group_Map", this.questiongrpmap)
        })
        //Map//

        let que: Question = new Question();
        que.QGID = map.QGID
        que.Language = "Low"
        this.service.postdatatoQ_Questions(que).subscribe((a: any) => {
          this.questions.push(a);
          console.log("questions", this.questions);
          let anstype: AnswerType = new AnswerType();

          this.questions.forEach(k => {

            anstype.AnswerType = "Inputfield"
            this.service.postdatatoQ_AnswersType_Master(anstype).subscribe((a: any) => {
              console.log("anstype", a);
              this.spin = false;
              this.snackbar.openSnackBar("Form created successfully", SnackBarStatus.success, 2000);
            })
          })

          // this.questions.forEach(ques => {
          //   var data: any = JSON.parse(localStorage.getItem("authorizationData"));
          //   let ans: Answer = new Answer();
          //   ans.UserID = data.UserID;
          //   ans.Language = ques.Language
          //   ans.ProjectID = map.ProjectID;
          //   ans.QGID = map.QGID;
          //   ans.QID = ques.QID;
          //   // this.service.postdatatoQ_Answers(ans).subscribe((a: any) => {
          //   //   console.log("Q_Answers", a)
          //   // })
          // })
        })

        // })

      })
      // })






    })
  }

}
