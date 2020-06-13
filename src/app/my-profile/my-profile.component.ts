import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';
import {AppComponent} from '../app.component';
import { ProfileServiceService } from './profile-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  responseData = {
    status: '',
    response: {
      first_name: '',
      last_name: '',
      contact: '',
      profession: '',
      biography: '',
      profile_picture: '',
      follower: '',
      following: ''
    },
    message: ''
  };

  imgUrl = 'assets/images/dummyprofile.png';

  constructor(
    private profileService: ProfileServiceService,
    private appnavbarlogo: AppComponent,
    private Authguardservice: AuthServicesService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){
    this.profileService.getCurrentProfile().subscribe((response: any)=>{
      this.responseData = response;
      if(this.responseData.status == "SUCCESS"){
        console.info(this.responseData);
        if(this.responseData.response.profile_picture != null){
          this.imgUrl = this.responseData.response.profile_picture;
        }else{
          this.imgUrl = 'assets/images/dummyprofile.png';
        }
        if(this.responseData.response.profile_picture != null){
          this.appnavbarlogo.profileImage = this.responseData.response.profile_picture;
        }else{
          this.appnavbarlogo.profileImage = 'assets/images/dummyprofile.png';
        }
      }
    });
  }
   
    

}
