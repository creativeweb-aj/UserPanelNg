import { Component } from '@angular/core';
import {AuthServicesService} from './auth-services.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Users Panel';
  // this opened for click side nav bar open and close
  opened = false;
  
  constructor(public Authguardservice: AuthServicesService) {} 

  ngOnInit(): void {

  }

}
