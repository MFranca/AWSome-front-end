import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  public userAuthenticated: boolean = false;
  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router // dependency injection
  ) {  }

  public isUserAuthenticated () : boolean {
    return this.userAuthenticated;
  }

  public info() {
    Auth.currentAuthenticatedUser().then(user => {
      console.log('[info] currentAuthenticatedUser', user);

      // https://stackoverflow.com/questions/48777321/aws-amplify-authentication-how-to-access-tokens-on-successful-auth-signin
      Auth.currentSession().then(res=>{
        let accessToken = res.getAccessToken();
        let idToken = res.getIdToken();
        let refreshToken = res.getRefreshToken();
      })      
    }).catch(() => {
      console.log('[info] Not signed in.');      
    });
  }

  public async getCurrentUserInfo() {    
    console.log((await this.getIdToken()).decodePayload());
    let tenant = (await this.getIdToken()).decodePayload()['custom:tenantId']; 
    let email = (await this.getIdToken()).decodePayload()['email'];
    return `${email} (${tenant})`;
  }

  async checkAuthenticated(): Promise<boolean> {    
    try {
      await Auth.currentAuthenticatedUser();
      this.userAuthenticated = true;
      this.showMenuEmitter.emit(true);
      return true;

    } catch (e) {
      this.userAuthenticated = false;
      this.showMenuEmitter.emit(false);
      return false
    }
  }

  async getAccessToken() {
    return (await Auth.currentSession()).getAccessToken();
  }

   async getIdToken() {
    return (await Auth.currentSession()).getIdToken();
  }

  async getRefreshToken() {
    return (await Auth.currentSession()).getRefreshToken();
  }

  async doAmplifyLogin() {
    try {      
      //https://medium.com/@georgemccreadie/introduction-to-using-aws-cognito-hosted-ui-with-amplify-js-4711cf4f925a
      Auth.federatedSignIn(); 
      
    } catch (error) {
      console.log('Error signing in: ', error);
    }
  }

  async doAmplifyLogout() {
    try {      
      Auth.signOut();      
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
}