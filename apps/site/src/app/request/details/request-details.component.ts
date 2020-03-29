import { Component, Input } from '@angular/core';

@Component({
  selector: 'tayssir-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  @Input()
  request:any = { "fullName": "Amine HANANE", "address": "N°48 rue 8 jamila 7 sbata casablanca morocco", "phone": "0610844460", "cin": "BH228844", "situation": "married", "childs": 3, "jobType": "JOB 1", "hasRamed": "no", "ramed": "", "jobAddress": "xdsdsdsd", "authoruty": "karim redo", "region": "02", "province": "167", "community": "03", "city": "" };

  constructor() {

   }

}
