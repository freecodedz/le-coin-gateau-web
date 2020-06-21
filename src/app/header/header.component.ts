import { SocialUser } from './../shared/models/social-user';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  socialUser: SocialUser;

  constructor(public dialog: MatDialog,
              public oAuth: AuthService, private router: Router) { }

  ngOnInit() {
    this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '600px';
    dialogConfig.maxWidth = '400px';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public logOut(): void {
    this.oAuth.signOut().then(data => {
      this.router.navigate(['/home']);
    });
  }

}
