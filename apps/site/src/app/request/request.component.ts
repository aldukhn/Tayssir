import { Component, ViewChild, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
export class RequestComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  jobs = ["JOB 1", "JOB 2", "JOB 3"];

  // load on init
  regions = regions;

  // load on select
  provinces = [];

  // load on select
  circles = [];

  // load on select
  communes = [];

  phoneNumber = "^(06)[0-9]{8}";

  @Input()
  request: any = {
    situation: 'single',
    childs: '0',
    hasRamed: 'no',
    state: 0
  };

  personalInformationsForm;
  jobInformationsForm;
  locationInformationsForm;

  @Output() requestSubmited = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem('tayssir-request')) {
      this.request = JSON.parse(localStorage.getItem('tayssir-request'));
      this.onRegionSelected(this.request.region, false);
      this.onProvinceSelected(this.request.province);
    }

    this.personalInformationsForm = new FormGroup({
      fullName: new FormControl(this.request.fullName, [Validators.required, Validators.minLength(4)]),
      address: new FormControl(this.request.address, [Validators.required]),
      phone: new FormControl(this.request.phone, [Validators.required, Validators.pattern(this.phoneNumber)]),
      cin: new FormControl(this.request.cin, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      cinRecto: new FormControl(this.request.cinRecto),
      cinVerso: new FormControl(this.request.cinVerso),
      situation: new FormControl(this.request.situation),
      childs: new FormControl(this.request.childs)
    });

    this.jobInformationsForm = new FormGroup({
      jobType: new FormControl(this.request.jobType, [Validators.required]),
      hasRamed: new FormControl(this.request.hasRamed, [Validators.required]),
      ramed: new FormControl(this.request.ramed),
      jobAddress: new FormControl(this.request.jobAddress, [Validators.required])
    });

    this.locationInformationsForm = new FormGroup({
      authoruty: new FormControl(this.request.authoruty, [Validators.required]),
      region: new FormControl(this.request.region, [Validators.required]),
      province: new FormControl(this.request.province, [Validators.required]),
      community: new FormControl(this.request.community, [Validators.required]),
      city: new FormControl(this.request.city, [Validators.required])
    });
  }

  get personalInformationsControl() {
    return this.personalInformationsForm.controls;
  }

  get jobInformationsControl() {
    return this.jobInformationsForm.controls;
  }

  get locationInformationsControl() {
    return this.locationInformationsForm.controls;
  }

  get situation() { return this.personalInformationsForm.get('situation').value; }

  get hasRamed() { return this.jobInformationsForm.get('hasRamed').value; }

  onRegionSelected(regionId, load = true) {
    this.provinces = provinces.filter(p => p.region_id == regionId);
    this.circles = [];
    this.communes = [];
    if (load) {
      this.locationInformationsForm.get('community').patchValue('');
      this.locationInformationsForm.get('city').patchValue('');
    }
  }

  onProvinceSelected(provinceId) {
    this.circles = circles.filter(c => c.province_id == provinceId);
    this.communes = communes.filter(c => c.province_id == provinceId);
  }

  onSubmitPI() {
    this.goToJobInformations();
    // personal informations
    this.request.fullName = this.personalInformationsForm.get('fullName').value;
    this.request.address = this.personalInformationsForm.get('address').value;
    this.request.phone = this.personalInformationsForm.get('phone').value;
    this.request.cin = this.personalInformationsForm.get('cin').value;
    this.request.situation = this.personalInformationsForm.get('situation').value;
    this.request.childs = this.personalInformationsForm.get('childs').value;

    localStorage.setItem('tayssir-request', JSON.stringify(this.request));
  }

  onSubmitJI() {
    this.goToLocationInformations();
    this.request.jobType = this.jobInformationsForm.get('jobType').value;
    this.request.hasRamed = this.jobInformationsForm.get('hasRamed').value;
    this.request.ramed = this.jobInformationsForm.get('ramed').value;
    this.request.jobAddress = this.jobInformationsForm.get('jobAddress').value;
    localStorage.setItem('tayssir-request', JSON.stringify(this.request));
  }

  onSubmitForms() {
    this.request.authoruty = this.locationInformationsForm.get('authoruty').value;
    this.request.region = this.locationInformationsForm.get('region').value;
    this.request.province = this.locationInformationsForm.get('province').value;
    this.request.community = this.locationInformationsForm.get('community').value;
    this.request.city = this.locationInformationsForm.get('city').value;

    let commune = communes.filter(c => c.id == this.request.city);
    if (commune) {
      this.request.commune = commune[0];
    }
    this.request.state = 1;
    localStorage.setItem('tayssir-request', JSON.stringify(this.request));
    this.requestSubmited.emit(this.request);
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

  // navigations 
  goToPersonalInformations() {
    this.staticTabs.tabs[2].active = true;
  }

  goToJobInformations() {
    this.staticTabs.tabs[1].active = true;
  }

  goToLocationInformations() {
    this.staticTabs.tabs[0].active = true;
  }

}
