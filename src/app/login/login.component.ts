import { SocialLoginService } from './../shared/services/social-login.service';
import { SocialUser } from './../shared/models/social-user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginForm: FormGroup;

  fbLabel: string;
  fbIconLink: string;
  fgIconAlt: string;
  googleLabel: string;
  googleIconLink: string;
  googleIconAlt: string;
  loginLabel: string;
  loginColor: string;

  response: any;
  socialUser: SocialUser;


  constructor(public oAuth: AuthService,
              private socialLoginService: SocialLoginService,
              private router: Router) { }

  ngOnInit() {
    this.socialUser = new SocialUser();

    this.buildButtons();
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  private buildButtons(): void {
    this.fbLabel = 'Continuer avec Facebook';
    this.fbIconLink = './assets/images/fb_logo.png';
    this.fgIconAlt = 'Continuer avec Facebook';
    this.googleLabel = 'Continuer avec Google';
    this.googleIconLink = './assets/images/google_logo.png';
    this.googleIconAlt = 'Continuer avec Google';
    this.loginLabel = 'Se connecter';
    this.loginColor = 'primary';
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  defaultSignIn() {
    if (this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm);
  }

  public socialSignIn(socialProvider: string): void {
    let socialPlatformProvider: any;
    if ( socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.oAuth.signIn(socialPlatformProvider).then(socialUser => {
      console.log(socialProvider, socialUser);
      console.log(socialUser);
      this.saveResponse(socialUser);
    });
  }
  saveResponse(socialusers: SocialUser) {
    this.socialLoginService.Savesresponse(socialusers).subscribe((res: any) => {
      console.log(res);
      this.socialUser = res;
      this.response = res.userDetail;
      localStorage.setItem('socialUser', JSON.stringify( this.socialUser));
      console.log(localStorage.setItem('socialUser', JSON.stringify(this.socialUser)));
      this.router.navigate([`/home`]);
    });
  }


}
