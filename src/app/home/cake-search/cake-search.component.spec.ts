import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeSearchComponent } from './cake-search.component';

describe('CakeSearchComponent', () => {
  let component: CakeSearchComponent;
  let fixture: ComponentFixture<CakeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
