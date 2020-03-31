import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { RequestDetailsComponent } from './request/details/request-details.component';
import { RequestValidationComponent } from './request/validation/request-validation.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, RequestComponent, RequestDetailsComponent, RequestValidationComponent],
  imports: [BrowserModule, HttpClientModule, TabsModule.forRoot(),
    FormsModule ,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
