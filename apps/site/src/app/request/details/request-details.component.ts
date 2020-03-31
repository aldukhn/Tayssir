import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tayssir-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  @Input()
  request: any = {};

  @Output() onCancel = new EventEmitter();

  constructor() {

  }

  cancel() {
    this.onCancel.emit();
  }
}
