import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tayssir-request-validation',
  templateUrl: './request-validation.component.html',
  styleUrls: ['./request-validation.component.css']
})
export class RequestValidationComponent {

  @Input()
  request: any = {};

  @Output() onCancel = new EventEmitter();

  constructor() {

  }

  cancel() {
    this.onCancel.emit();
  }
}
