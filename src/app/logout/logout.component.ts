import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  responseData = {
    status: '',
    response: {},
    token: '',
    message: ''
  };

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    let url = "http://192.168.1.101:8000/auth/logout/";
    let token = localStorage.getItem("UserToken");
    // let headers = new HttpHeaders({'Authorization': 'token '+ token});
    debugger
    this.http.get(url, { headers: new HttpHeaders({'Authorization': 'token ' + token})});
    localStorage.removeItem('UserToken')
    this.router.navigate(['/login'])
  }

}
