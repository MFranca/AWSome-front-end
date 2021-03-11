import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { VideosService } from 'src/app/shared/services/videos.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public httpResponseStatus;
  public httpResponseHeaders;
  public httpResponseBody;

  private fileToUpload;
  public nomeArquivo: string = "";

  /* @ViewChild('txtUrl') 
  public txtCampo: ElementRef; */
  public preSignedURL: string = "";

  constructor(
    private videoService: VideosService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  public inputFileChange(e: Event): void {
    // todo validar o preenchimento
    var element = e.target as HTMLInputElement;

    //this.arquivo = (e.target as HTMLInputElement).files[0];
    //this.arquivo = <HTMLVideoElement>document.querySelector('#camera-stream')
    //this.arquivo = ((<HTMLInputElement>e.target).files)?.item[0];
    //console.log((<HTMLInputElement>e.target).files);

    if (null !== element.files) {
      this.fileToUpload = element.files[0];
      this.nomeArquivo = this.fileToUpload.name;
      //console.log("Filename: ", this.nomeArquivo);
    }

    //console.log(evento);
    console.log(`[inputFileChange] ${this.nomeArquivo}`);

    //this.txtCampo.nativeElement.value = "Loading...";
    this.preSignedURL = "Loading...";
  }

  public buttonGeneratePreSignUrl(evento: Event): void {
    console.log("*** Get Pre-Signed URL... ***");

    //const endpoint = this.baseURL;
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});    
    /* const body = {
      "mensagem": "meu conteudo cru entre aspas"
    }; */

    // através de um service
    /* this.s3Service.updateS3(this.baseURL).subscribe(
      next => {
        let resposta = next;
        this.s3PresignedUrl = resposta.url.toString();
        console.log('Observer got a next value [resposta.body]: ' + resposta.body);
        //console.log("URL assinada: " + this.s3PresignedUrl);
        console.log(`URL assinada a ser invocada: ${this.s3PresignedUrl}`);
        //this.txtCampo.nativeElement.innerHTML = this.s3PresignedUrl;
        this.txtCampo.nativeElement.value = this.s3PresignedUrl;
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')  
    );*/


    /* this.httpResponseStatus = 200;             
    this.httpResponseHeaders = "headers";   
    this.httpResponseBody = "body";     */

    this.videoService.putVideosFullResponse(this.nomeArquivo)
      .subscribe(response => {
        this.httpResponseStatus = response.status;
        this.httpResponseHeaders = response.headers;
        this.httpResponseBody = response.body;
      },
        error => {
          console.log("*** error ***");
          console.log(error);
          var responseError = error as HttpErrorResponse;

          this.httpResponseStatus = responseError.status; // + " - " + responseError.statusText;
          this.httpResponseBody = responseError.headers;
          this.httpResponseBody = responseError.error;
        });
  }

  public buttonGeneratePreSignUrlAuth(event: Event): void {
    console.log("*** Get Auth Pre-Signed URL... ***");

    this.authService.getAccessToken().then(
      res => {
        var accessToken = res.getJwtToken();

        this.videoService.putVideosFullResponseAuth(this.nomeArquivo, accessToken)
        .subscribe(response => {
          this.httpResponseStatus = response.status;
          this.httpResponseHeaders = response.headers;
          this.httpResponseBody = response.body;

          this.preSignedURL = this.httpResponseBody.url;
          //console.log("preSignedURL", this.preSignedURL);
        },
          error => {
            console.log("*** error ***");
            console.log(error);
            var responseError = error as HttpErrorResponse;
  
            this.httpResponseStatus = responseError.status; // + " - " + responseError.statusText;
            this.httpResponseBody = responseError.headers;
            this.httpResponseBody = responseError.error;
          });
      }
    );    
  }

  public buttonUploadFileToS3(event: Event): void {
    //console.log("*** buttonUploadFileToS3... ***");
    //console.log(`With URL: ${this.preSignedURL}`);
    
    const fileuploadurl = this.preSignedURL;    
    //once the presigned url is received the next service call will upload the file.
    this.videoService.putFileS3(fileuploadurl, "video/mp4", this.fileToUpload).subscribe(
      next => {
        let response = next;        
        this.preSignedURL = 'Uploaded Started...'; // - body: ' + response;
      },
      err => this.preSignedURL = 'Observer got an error: ' + err,
      () => {
        console.log('Observer got a complete notification');
        this.preSignedURL = 'Uploaded Completed!';
      }  
    );
    //handle HttpEvent progress or response and update view
  }
}
