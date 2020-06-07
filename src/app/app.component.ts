import { Component } from '@angular/core';
import {AuthServicesService} from './auth-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Users Panel';
  // this opened for click side nav bar open and close
  opened = false;

  profileImage = 'assets/images/logo1.png';
  
  constructor(public Authguardservice: AuthServicesService, private router: Router) {} 

  ngOnInit(): void {
    if (!this.Authguardservice.getToken()) {
      this.router.navigateByUrl("/login");
      this.profileImage = 'assets/images/logo1.png';
    }
  }

}
