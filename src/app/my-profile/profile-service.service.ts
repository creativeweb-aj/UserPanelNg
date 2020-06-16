import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  getCurrentProfile(){
    // get user data
    let url = "http://192.168.1.101:8000/auth/profile";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.get(url, {headers: header}).pipe(
      catchError(err => {
          return throwError(err);
      })
    )
  }

  updateUserProfile(data){
    let url = "http://192.168.1.101:8000/auth/edit-profile";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(url, data, {headers: header}).pipe(
      catchError(err => {
          this._snackBar.open(err.error.detail, 'Ok', {
            duration: 3000,
          });
          return throwError(err);
        })
    )
  }

  getUserProfile(data){
    // get user data
    let url = "http://192.168.1.101:8000/auth/user-profile";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(url, data, {headers: header}).pipe(
      catchError(err => {
          return throwError(err);
      })
    )
  }

  followUnfollowUser(data){
    // get user data
    let url = "http://192.168.1.101:8000/auth/follow-user";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(url, data, {headers: header}).pipe(
      catchError(err => {
          return throwError(err);
      })
    )
  }


}
