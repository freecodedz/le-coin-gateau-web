import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss']
})
export class SignInButtonComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  iconLink: string;

  @Input()
  iconAlt: string;

  @Input()
  bgColor: string;

  @Output() signIn = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  signInEmit(): void {
    this.signIn.emit();
  }

}
