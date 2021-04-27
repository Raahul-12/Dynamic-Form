import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Q_Projects } from 'app/models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:55997/';
  postdatatoQ_Project(doc: any): Observable<any> {

    // return this.http.post<any>(this.baseUrl + "api/Create/AddQ_Project", doc);
    return this.http.post<any>(this.baseUrl + "api/Create/AddQ_Project", doc, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json'
      // })
    })
  }
  postdatatoQ_Project_Group_Map(doc: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + "api/Create/AddQ_project_GroupMap", doc, {
    })
  }
  postdatatoQ_Questions(doc: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + "api/Create/AddQ_Questions", doc, {
    })
  }
  postdatatoQ_Answers(doc: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + "api/Create/AddQ_Answers", doc, {
    })
  }
  postdatatoQ_AnswersType_Master(doc: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + "api/Create/AddQ_AnswersType", doc, {
    })
  }
  postdatatoQuestionGroups(doc: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + "api/Create/AddQuestionGroup", doc, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json'
      // })
    })
  }
  postdatatoQ_Answer(doc: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "api/Create/AddQ_Answers", doc, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json'
      // })
    })
  }
}
