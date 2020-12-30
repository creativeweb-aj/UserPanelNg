import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private API_URL = environment.API_URL
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  getCurrentProfile(){
    // get user data
    let url = this.API_URL+"/auth/profile";
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
    let url = this.API_URL+"/auth/edit-profile";
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
    let url = this.API_URL+"/auth/user-profile";
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
    let url = this.API_URL+"/auth/follow-user";
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
