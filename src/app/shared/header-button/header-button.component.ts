import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  picto: string;

  @Input()
  iconColor: string;

  @Input()
  isUserLogIn: boolean;

  @Output()
  buttonAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  launchAction() {
    this.buttonAction.emit();
  }

}
