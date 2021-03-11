import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

const BASE_URL = AppComponent.environmentUrl;

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private _resource = "labels"; //https://stackoverflow.com/questions/40587873/naming-convention-for-class-properties-in-typescript

  constructor(private _http: HttpClient) { }

  private getUrl() : string {
    return BASE_URL + this._resource;    
  }

  private getUrlById(id) : string {
    return `${this.getUrl()}/${id}`;
  }

  public getLabels (token: string) : Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}),
      observe: 'response' as const // <--- VERY IMPORTANT FRAGMENT (as const)
    };
    
    return this._http.get<any>(this.getUrl(), httpOptions);
  }

  public getVideosList (token: string, label: string) : Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}),
      observe: 'response' as const // <--- VERY IMPORTANT FRAGMENT (as const)
    };
    
    return this._http.get<any>(this.getUrlById(label), httpOptions);
  }

}
