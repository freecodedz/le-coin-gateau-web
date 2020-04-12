import { City } from './models/city';
import { CakeSearchService } from './services/cake-search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { map, debounceTime, tap, switchMap, finalize} from 'rxjs/operators';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment';


@Component({
  selector: 'app-cake-search',
  templateUrl: './cake-search.component.html',
  styleUrls: ['./cake-search.component.scss']
})
export class CakeSearchComponent implements OnInit {


  calendarIcon = faCalendarAlt;
  minDate = moment();
  maxDate: any;

  searchGroup: FormGroup;
  filteredCities: City[] = [];
  isLoading = false;
  post: any = '';



  constructor(private fb: FormBuilder, private cakeSearchService: CakeSearchService) {
  }

  ngOnInit() {

    this.searchGroup = this.fb.group({
      'cakeModel': [null, Validators.required],
      'city': [null, Validators.required],
      'eventDate': [null, Validators.required]
    });

    this.searchGroup.get('city').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.cakeSearchService.searchCity(value)
      .pipe(
        finalize(() => this.isLoading = false),
      )
      )
    ).subscribe(result => this.filteredCities = result);
    this.maxDate =  moment(this.minDate).add(1, 'y');

  }

  displayFn(city: City) {
    if (city) { return city.name + ' - ' + city.zip_code; }
  }

  onSubmit(post) {
    // , eventType.value, eventDate.value
    alert('Your Email is : ' + post );
  }

}
