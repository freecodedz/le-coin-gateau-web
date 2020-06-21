import { SocialUser } from './../shared/models/social-user';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { faBreadSlice, faBirthdayCake, faEnvelopeOpenText, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  socialUser: SocialUser;

  bakeCakeIcon: IconDefinition;
  searchCakeIcon: IconDefinition;
  userIcon: IconDefinition;
  contactIcon: IconDefinition;
  bakeCakeDesc: string;
  searchCakeDesc: string;
  userDesc: string;
  contactDesc: string;
  postAdDesc: string;
  postAdIcon: IconDefinition;

  constructor(public dialog: MatDialog,
              public oAuth: AuthService, private router: Router,) { }

  ngOnInit() {
    this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
    this.initButtons();
  }

  private initButtons(): void {

    this.bakeCakeDesc = 'Je fais ton gâteau';
    this.bakeCakeIcon = faBreadSlice;
    this.searchCakeIcon = faBirthdayCake;
    this.searchCakeDesc = 'Je cherche un pâtissier';
    this.postAdDesc = 'Je publie une annonce';
    this.postAdIcon = faBell;
    this.userIcon = faUser;
    if (this.socialUser) {
      this.userDesc = 'Se déconnecter';
    } else {
      this.userDesc = 'Se connecter';
    }
    this.contactIcon = faEnvelopeOpenText;
    this.contactDesc = 'Nous contacter';
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '600px';
    dialogConfig.maxWidth = '400px';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public logOut(): void {
    localStorage.clear();
    localStorage.removeItem('socialUser');
    this.oAuth.signOut().then(data => {
      this.router.navigate(['/home']);
    });
  }

}
