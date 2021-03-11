import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
//import { ActivatedRoute, Params } from '@angular/router';
//import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() 
  appTitle: string =""; //from parent component?!

  //private usuario: Usuario = new Usuario();
  public status: string = "";
  public accessToken: string = "";
  public idToken: string = "";
  public refreshToken: string = "";
  
  constructor(private authService: AuthService/*, private currentRoute: ActivatedRoute*/) { // dependency injection
    /* const fragment: string = currentRoute.snapshot.fragment;
    console.log(currentRoute);
    console.log("Fragment: " + fragment); */
   } 

   public ngOnInit():void {
     this.authService.info();
      /* Auth.currentAuthenticatedUser().then(user => {
        console.log('currentAuthenticatedUser', user)
        //this.setState({ user})
      }).catch(() => console.log('Not signed in')) */

    this.authService.checkAuthenticated().then(state => {
      if (state)
        console.log("[double checked] Sessão iniciada!");
      else
        console.log("[double checked] Sessão não iniciada!");
      this.refresh();
    });

    this.authService.getAccessToken().then(
      res => this.accessToken = res.getJwtToken()).catch(() => console.log("no current user"));
    this.authService.getIdToken().then(
        res => this.idToken = res.getJwtToken()).catch(() => console.log("no current user"));
    this.authService.getRefreshToken().then(
      res => this.refreshToken = res.getToken()).catch(() => console.log("no current user"));

    /* const token = this.currentRoute.snapshot.queryParamMap.get('access_token');
    console.log("access_token: ", token);
    // Handle token
    // ...
    //this.router.navigate(['./host']);

    this.currentRoute.url.subscribe
    (
      (url:any) => {
        console.log("OnInit: " + url);
      }
    );    
        
    this.currentRoute.fragment.subscribe((fragments: string) => {
      console.log("My hash fragment is here => ", fragments);
    });

    this.currentRoute.params.subscribe((params: Params) => {
        console.log("Parameters...");
        console.log(params);
        //let userId = params['user_id'];
        //console.log(userId);
    });
 */
    
  }

  refresh() {
    this.status = this.authService.userAuthenticated ? "connected" : "disconnected";
  }

  doLogin()
  {
    console.log("doLogin", this.authService.userAuthenticated);
    this.authService.doAmplifyLogin();
    //this.refresh();
    //console.log("doLogin", this.authService.userAuthenticated);
  }

  doLogout()
  {
    console.log("doLogout", this.authService.userAuthenticated);
    this.authService.doAmplifyLogout();
  }

}
