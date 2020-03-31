import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tayssir-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  @Input() request: any = {};

  @Output() onCancel = new EventEmitter();

  @Output() onSubmit = new EventEmitter();

  showValidationSection = false;

  constructor() {
  }

  cancel() {
    this.request.state = 0;
    localStorage.setItem('tayssir-request', JSON.stringify(this.request));
    this.onCancel.emit(this.request);
  }

  submit() {
    this.showValidationSection = true;
    // call the api for generate code and send it !!!!! + save the request in storage
    this.request.state = 2;
    localStorage.setItem('tayssir-request', JSON.stringify(this.request));
    this.onSubmit.emit(this.request);
  }

}
