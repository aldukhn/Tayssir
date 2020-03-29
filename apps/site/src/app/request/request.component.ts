import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { regions } from './regions';
import { provinces } from './provinces';
import { communes } from './communes';
import { circles } from './circles';

@Component({
  selector: 'tayssir-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  jobs = ["JOB 1", "JOB 2", "JOB 3"];

  regions = regions;

  provinces = [];

  circles = [];

  communes = [];

  
  phoneNumber = "^(06)[0-9]{8}";

  request: any = {};

  formSubmited = false;

  personalInformationsForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
    cin: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    cinRecto: new FormControl(''),
    cinVerso: new FormControl(''),
    situation: new FormControl('single'),
    childs: new FormControl('0')
  });

  jobInformationsForm = new FormGroup({
    jobType: new FormControl(null, [Validators.required]),
    hasRamed: new FormControl('no', [Validators.required]),
    ramed: new FormControl(''),
    jobAddress: new FormControl('', [Validators.required])
  });

  locationInformationsForm = new FormGroup({
    authoruty: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    community: new FormControl('', [Validators.required]),
    city: new FormControl('')
  });

  get personalInformationsControl() {
    return this.personalInformationsForm.controls;
  }

  get jobInformationsControl() {
    return this.jobInformationsForm.controls;
  }

  get locationInformationsControl() {
    return this.locationInformationsForm.controls;
  }

  constructor() {
  }

  onSubmitPI() {
    this.staticTabs.tabs[1].active = true;
  }

  onSubmitJI() {
    this.staticTabs.tabs[0].active = true;
  }

  goToPersonalInformations() {
    this.staticTabs.tabs[2].active = true;
  }

  goToJobInformations() {
    this.staticTabs.tabs[1].active = true;
  }

  get situation() { return this.personalInformationsForm.get('situation').value; }

  get hasRamed() { return this.jobInformationsForm.get('hasRamed').value; }

  onRegionSelected(regionId) {
    this.provinces = provinces.filter(p => p.region_id == regionId);
  }

  onProvinceSelected(provinceId) {
    this.circles = circles.filter(c => c.province_id == provinceId);
  }

  onCircleSelected(circleId) {
    this.communes = communes.filter(c => c.circle_id == circleId);
  }

  onSubmitForms() {
    // personal informations
    this.request.fullName = this.personalInformationsForm.get('fullName').value;
    this.request.address = this.personalInformationsForm.get('address').value;
    this.request.phone = this.personalInformationsForm.get('phone').value;
    this.request.cin = this.personalInformationsForm.get('cin').value;
    this.request.situation = this.personalInformationsForm.get('situation').value;
    this.request.childs = this.personalInformationsForm.get('childs').value;
    // personal informations
    this.request.jobType = this.jobInformationsForm.get('jobType').value;
    this.request.hasRamed = this.jobInformationsForm.get('hasRamed').value;
    this.request.ramed = this.jobInformationsForm.get('ramed').value;
    this.request.jobAddress = this.jobInformationsForm.get('jobAddress').value;
    // locationInformationsForm
    this.request.authoruty = this.locationInformationsForm.get('authoruty').value;
    this.request.region = this.locationInformationsForm.get('region').value;
    this.request.province = this.locationInformationsForm.get('province').value;
    this.request.community = this.locationInformationsForm.get('community').value;
    this.request.city = this.locationInformationsForm.get('city').value;
    this.formSubmited = true;
  }

  onCinRectoChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.request.cinRecto = reader.result;
      };
    }
  }

  onCinVersoChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.request.cinVerso = reader.result;
      };
    }
  }

}
