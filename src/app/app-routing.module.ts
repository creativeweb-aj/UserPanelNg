import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationGuard} from './authentication.guard';

import { SignupComponent } from './signup/signup.component';
import { EmailverificationComponent } from './signup/emailverification/emailverification.component';
import { LoginComponent } from './login/login.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {UserProfileComponent} from './my-profile/user-profile/user-profile.component';
import {EditProfileComponent} from './my-profile/edit-profile/edit-profile.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import {UserPostsComponent} from './posts/user-posts/user-posts.component';

// set urls here for routing
const routes: Routes = [
  { path: '', component: PostsComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'post/:id', component: PostDetailsComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'create-post', component: CreatePostComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'user-post', component: UserPostsComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'verification/:id', component: EmailverificationComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'profile', component: MyProfileComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'user-profile/:id', component: UserProfileComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: 'profile/editprofile', component: EditProfileComponent, pathMatch: 'full', canActivate:[AuthenticationGuard]},
  { path: '**', component: NotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
