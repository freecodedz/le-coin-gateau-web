import { MatButtonModule } from '@angular/material/button';
import { DATE_FORMAT } from './models/date-format';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';



@NgModule({
  declarations: [SignInButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    SignInButtonComponent,
    MatButtonModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT }
  ]
})
export class SharedModule { }
