import { City } from './models/city';
import { CakeSearchService } from './services/cake-search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
  minDate: Date;
  maxDate: Date;

  searchForm: FormGroup;
  filteredCities: City[] = [];
  isLoading = false;



  constructor( private cakeSearchService: CakeSearchService) {
  }

  ngOnInit() {

    this.initForm();

    this.searchForm.get('city').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.cakeSearchService.searchCity(value)
      .pipe(
        finalize(() => this.isLoading = false),
      )
      )
    ).subscribe(result => this.filteredCities = result);

  }

  displayFn(city: City) {
    if (city) { return city.name + ' - ' + city.zip_code; }
  }

  onSubmit() {
    if(this.searchForm.invalid){
      return;
    }
    console.log(this.searchForm);
  }

  private initForm(): void {
    this.minDate = new Date();
    this.maxDate = new Date((this.minDate.getFullYear()) + 1, this.minDate.getMonth(), this.minDate.getDate());

    this.searchForm = new FormGroup({
      cakeModel: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      eventDate: new FormControl(null, Validators.required)
    });
  }

}
