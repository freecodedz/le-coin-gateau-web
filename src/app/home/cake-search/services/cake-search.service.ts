import { City } from './../models/city';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeSearchService {

  constructor(private httpService: HttpClient) { }

  getCities(): Observable<Array<City>> {
    return this.httpService.get<Array<City>>('/api/cities');
  }

  searchCity(name: string): Observable<Array<City>> {
    return this.httpService.get<Array<City>>('/api/cities?name_like=' + name + '&_page=' + 1);
  }
}
