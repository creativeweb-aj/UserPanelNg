import { Component } from '@angular/core';
import {AuthServicesService} from './auth-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  profileImage = 'assets/images/dummyprofile.png';
  userName: string = 'User Name';
  
  constructor(public Authguardservice: AuthServicesService, private router: Router) {} 

  ngOnInit(): void {
    if (!this.Authguardservice.getToken()) {
      this.router.navigateByUrl("/login");
    }
  }

}
