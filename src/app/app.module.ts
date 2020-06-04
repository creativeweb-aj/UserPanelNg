import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AuthServicesService} from './auth-services.service'
// importing angular material modules from this module file
import { MaterialModule } from './material/material.module';
// importing apps components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmailverificationComponent } from './signup/emailverification/emailverification.component';
import { LogoutComponent } from './logout/logout.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    EmailverificationComponent,
    LogoutComponent,
    NotfoundComponent,
    MyProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
