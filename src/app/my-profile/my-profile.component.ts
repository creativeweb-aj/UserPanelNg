import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';
import {AppComponent} from '../app.component';

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
      profile_picture: ''
    },
    message: ''
  };

  imgUrl = '';

  constructor(
    private appnavbarlogo: AppComponent,
    private Authguardservice: AuthServicesService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.Authguardservice.getToken()) {
      this.router.navigateByUrl("/login");
      return
    }

    // get user data
    let url = "http://192.168.1.101:8000/auth/profile/";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    
    this.http.get(url, {headers: header})
    .pipe(
      catchError(err => {
          this._snackBar.open(err.error.detail, 'Ok', {
            duration: 3000,
          });
          return throwError(err);
        })
    )
    .subscribe((response: any)=>{
      this.responseData = response;
      if(this.responseData.status == "SUCCESS"){
        console.info(this.responseData);
        this.imgUrl = 'http://192.168.1.101:8000'+this.responseData.response.profile_picture;
        this.appnavbarlogo.profileImage = 'http://192.168.1.101:8000'+this.responseData.response.profile_picture;
      }
    });

  }

}
