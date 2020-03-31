import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'tayssir-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  request = {
    situation: 'single',
    childs: '0',
    hasRamed: 'no',
    state: 0
  };

  constructor() {

    setTheme('bs4');

    if (localStorage.getItem('tayssir-request')) {
      this.request = JSON.parse(localStorage.getItem('tayssir-request'));
    }

  }

  onCancelValidation() {
    this.request = {
      situation: 'single',
      childs: '0',
      hasRamed: 'no',
      state: 0
    };
    localStorage.removeItem('tayssir-request');
  }
}
