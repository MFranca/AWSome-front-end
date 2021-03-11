import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment'; // configurações externas
import { AuthService } from './shared/services/auth.service';
//import Auth from "@aws-amplify/auth";

@Component({ //metadata
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AWSome Builder Blog';
  userInfo = 'unauthenticated';

  showMenu: boolean = false;
  public static environmentName = environment.environmentName;;
  public static environmentUrl = environment.apiUrl;

  links = [
    //https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/tests', icon: 'public', title: 'Simple Tests' },
    //{ path: '/videos', icon: 'video_library', title: 'Videos on S3' },
    //{ path: '/info', icon: 'person', title: 'Info' }
  ];

  constructor(public authAWSome: AuthService,
    private router: Router) { // in order to navigate using code instead of UI/navigation-bar

    this.authAWSome.showMenuEmitter.subscribe(
      show => {
        this.showMenu = show;

        if (show) { //this.checkSession();        
          //console.log("idToken: ", authAWSome.getIdToken());
          this.authAWSome.getCurrentUserInfo().then(user => {
            console.log("User: ", user)
            this.userInfo = user;
          });
          
          //console.log("currentUserInfo: ", Auth.currentUserInfo());
          /*Auth.currentUserInfo().then((user) => {
            console.log('user = ', user);
          });*/
        }
        else
          this.userInfo = "unauthenticated";
      }      
    );
  }

  checkUserInfo() {
    console.log("*** checkUserInfo ***");
    this.authAWSome.info();
  }

  /* ngOnInit(){
    this.authService.showMenuEmitter.subscribe(
      show => this.showMenu = show
    );
  } */

 /*  async checkSession() {
    console.log("*** checkSession ***");
    try {
      const userInfo = await Auth.currentUserInfo();
      if (userInfo && userInfo.attributes.profile) {
        //const avatar = userInfo.attributes.profile;
        //const url = (await Storage.vault.get(avatar)) as string;
        //this.avatar = url;
        console.log("User profile...");
        console.log(userInfo);
        this.userInfo = userInfo;
      }
    } catch (error) {
      console.log("no session: ", error);
    }
  } */

  public login() {
    this.router.navigateByUrl("/login");
  }
}