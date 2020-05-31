import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getToken(){  
    return !!localStorage.getItem("UserToken");  
  }  

  logOutUser() {
    localStorage.removeItem('UserToken')
    this.router.navigate(['/login'])
  }


}
