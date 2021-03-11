import { HttpClientModule } from '@angular/common/http'; // REST client

// Internationalization (PT-BR)
import { NgModule, LOCALE_ID } from '@angular/core'; // https://github.com/angular/angular-cli/issues/6683
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatVideoModule } from 'mat-video'; // https://www.npmjs.com/package/mat-video

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// UI
import { MaterialModule } from './material.module';
//import { FormsModule } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; //https://stackoverflow.com/questions/43220348/cant-bind-to-formcontrol-since-it-isnt-a-known-property-of-input-angular

// My Components
import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { LoginComponent } from './components/login/login.component';

// My Services...
import { TestsService } from './shared/services/tests.service';
import { AuthService } from './shared/services/auth.service';
import { LabelsService } from './shared/services/labels.service';
import { VideosService } from './shared/services/videos.service';

// AWS Amplify
//import { Auth, Hub, API } from 'aws-amplify';
import { UploadComponent } from './components/upload/upload.component';
import { VideosComponent } from './components/videos/videos.component';
//import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

registerLocaleData(ptBr) // https://github.com/angular/angular/issues/20197#issuecomment-361097171

@NgModule({
  imports: [ // imports are for modules
    BrowserModule,
    AppRoutingModule, // Rotas de nevegação em app-routing.module.ts (routing table) - best practice to have it in a separated module
    BrowserAnimationsModule, //MatVideoModule,
    MaterialModule,
    HttpClientModule, // obviously, to make HTTP calls (added by Angular CLI).
    FormsModule, ReactiveFormsModule // to work with (template) forms
  ],
  declarations: [ // declarations are for components
    AppComponent,
    HomeComponent,
    TestsComponent,
    LoginComponent,
    UploadComponent,
    VideosComponent,
    //CoursesListComponent,
    //CourseDetailsComponent,
    //LessonsListComponent,
    //UsersComponent
  ],
  providers: [ // providers are for services
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // force to use locale pt-BR
    TestsService,
    AuthService, VideosService, LabelsService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }