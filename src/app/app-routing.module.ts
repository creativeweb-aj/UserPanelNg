import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationGuard} from './authentication.guard';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { EmailverificationComponent } from './signup/emailverification/emailverification.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotfoundComponent } from './notfound/notfound.component';

// set urls here for routing
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'verification/:id', component: EmailverificationComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: '**', component: NotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
