import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppComponent } from 'src/app/app.component';
const BASE_URL = AppComponent.environmentUrl;

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private resource = "tests";
    
  constructor(private http: HttpClient) { } // imported at app.module.ts

  private getUrl() : string {
    return BASE_URL + this.resource;    
  }

  /* private getUrlById(id) : string {
    return `${this.getUrl()}/${id}`;
  } */

  public allWithFullResponse () : Observable<HttpResponse<any>> {
    console.log("[allWithFullResponse] URL: ", this.getUrl());

    //Now HttpClient.get() returns an Observable of type HttpResponse rather than just the JSON data contained in the body.
    return this.http.get<any>(this.getUrl(), { observe: 'response' });
  }

  public all () {
    //return this.courses;
    console.log("URL: ", this.getUrl());
    return this.http.get(this.getUrl()); // it will return an OBSERVABLE
  }

  public getVersionFullResponse () : Observable<HttpResponse<any>> {
    //console.log("[allWithFullResponse] URL: ", this.getUrl());
    //Now HttpClient.get() returns an Observable of type HttpResponse rather than just the JSON data contained in the body.
    return this.http.get<any>(this.getUrl()+"/version", { observe: 'response' });
  }

  public getIdResponse () : Observable<HttpResponse<any>> {    
    return this.http.get<any>(this.getUrl()+"/mcfranca", { observe: 'response' });
  }

  public putAboutFullResponse(): Observable<HttpResponse<any>> {
    console.log("[putAboutFullResponse] URL: ", this.getUrl()+"/about");

    //const httpOptions = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json'/*,
    //    Authorization: 'my-auth-token'*/
    //  }),
    //  observe: 'response'
    //};
    //httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    /* var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }; */

    //const body = "body cru entre aspas";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'}),
      observe: 'response' as const, // <--- VERY IMPORTANT FRAGMENT (as const)
    };
    
    //return this.http.put<any>(this.getUrl()+"/about", { observe: 'response' });
    return this.http.put<any>(this.getUrl()+"/about", null, httpOptions); // we need to pass the body (null)

    //(this.heroesUrl, hero, httpOptions)
    /*     return this.http.put<any>(this.getUrlById("franca"),
      "meu body entre áspas e o CONTENT-TYPE HEADER como JSON, sentao toma 415",
      httpOptions); */
  }

}