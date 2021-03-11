import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
//import { MatVideoComponent } from 'mat-video/lib/video.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LabelsService } from 'src/app/shared/services/labels.service';
import { VideosService } from 'src/app/shared/services/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  myControl = new FormControl();
  
  labels: string[] = [];//['One', 'Two', 'Three'];
  filteredLabels?: Observable<string[]>;  
  videos: string[] = [];//['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  preSignedVideoURL = "<select a video first>";

  @ViewChild('videoPlayer') 
  videoPlayer?: ElementRef;
  video?: HTMLVideoElement;    
  //videoPlayer?: MatVideoComponent;   

  constructor(
    private _videosService: VideosService, 
    private _labelsService: LabelsService, 
    private _authService: AuthService) { }

  ngOnInit(): void {
    /* this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    ); */
    this.refresh();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.labels.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private refresh(): void {
    this.load();

    /* this.filteredOptions = this.myControl.valueChanges
    .pipe(         
      startWith(''),
      map(value => this._filter(value))
    ); */
  }

  private load(): void {
    console.log("*** load ***");

    this._authService.getAccessToken().then(
      res => {
        var accessToken = res.getJwtToken();

        this._labelsService.getLabels(accessToken)
          .subscribe(response => {
            //https://stackoverflow.com/questions/52113057/angular-material-autocomplete-initialize-filtered-options-to-view-all-options-o
            this.labels = response.body;            
            this.filteredLabels = this.myControl.valueChanges
              .pipe(         
                startWith(''),
                map(value => this._filter(value))
              );

            console.log(`Response: ${response.status} - ${response.statusText}`);
            // resp is of type `HttpResponse<any>`        
            console.log("Headers: ", response.headers.keys());
            // And access the body directly.
            console.log("Body: ", response.body);
          },
          error => {
            console.log("*** load error ***");
            console.log(error);
            var responseError = error as HttpErrorResponse;
            console.log("httpResponseStatus", responseError.status);
            console.log("httpResponseHeaders", responseError.headers);            
            console.log("httpResponseBody", responseError.error);            
          });
      }
    );
  }

  public buttonListVideos(event: Event): void {
    console.log("*** buttonListVideos ***");
    console.log("Label: ", this.myControl.value);

    this._authService.getAccessToken().then(
      res => {
        var accessToken = res.getJwtToken();

        this._labelsService.getVideosList(accessToken, this.myControl.value)
          .subscribe(response => {            
            //this.videosList = response.body;
            this.videos = response.body;
            console.log(`Response: ${response.status} - ${response.statusText}`);
            // resp is of type `HttpResponse<any>`        
            console.log("Headers: ", response.headers.keys());
            // And access the body directly.
            console.log("Body: ", response.body);
          },
          error => {
            console.log("*** buttonListVideos error ***");
            console.log(error);
            var responseError = error as HttpErrorResponse;
            console.log("httpResponseStatus", responseError.status);
            console.log("httpResponseHeaders", responseError.headers);            
            console.log("httpResponseBody", responseError.error);            
          });
      }
    );
  }

  public buttonSelectVideo(event: Event): void {
    var myDiv = (<HTMLElement> event.target);
    var video = myDiv.textContent;
    console.log(`*** buttonSelectVideo (${video}) ***`);    

    this._authService.getAccessToken().then(
      res => {
        var accessToken = res.getJwtToken();

        this._videosService.getVideoUrl(accessToken, video!)
          .subscribe(response => {                        
            this.preSignedVideoURL = response.body["url"];
            console.log(`Response: ${response.status} - ${response.statusText}`);
            // resp is of type `HttpResponse<any>`        
            console.log("Headers: ", response.headers.keys());
            // And access the body directly.
            console.log("Body: ", response.body);
          },
          error => {
            console.log("*** buttonSelectVideo error ***");
            console.log(error);
            var responseError = error as HttpErrorResponse;
            console.log("httpResponseStatus", responseError.status);
            console.log("httpResponseHeaders", responseError.headers);            
            console.log("httpResponseBody", responseError.error);            
          });
      }
    );
  }

  public buttonGetVideo(event: Event): void {   
    console.log("*** buttonGetVideo ***"); 
    console.log(this.preSignedVideoURL);        
    this.video = this.videoPlayer?.nativeElement;
    
    //https://www.w3schools.com/tags/ref_av_dom.asp
    this.video!.title = "AWSome Builder";
    this.video!.src = this.preSignedVideoURL; //Sets or returns the current source of the audio/video element
    this.video!.volume = 0.2;
    this.video!.play();

/* 
    this.videoPlayer!.load();
    this.videoPlayer!.src = this.preSignedVideoURL;        
    this.videoPlayer!.autoplay = true; */
    
  }

 
}