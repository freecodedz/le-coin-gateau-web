import { SocialUser } from './../models/social-user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  url: string;

  constructor(private httpService: HttpClient) { }

  Savesresponse(socialUser: SocialUser): Observable<SocialUser> {
    this.url =  '/api/users';
    return this.httpService.post<SocialUser>(this.url, socialUser);
  }
}
