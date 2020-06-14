import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AuthServicesService} from './auth-services.service'
// importing angular material modules from this module file
import { MaterialModule } from './material/material.module';
// importing apps components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmailverificationComponent } from './signup/emailverification/emailverification.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UserPostsComponent } from './posts/user-posts/user-posts.component';
import { UserProfileComponent } from './my-profile/user-profile/user-profile.component';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';

import { AngularCropperjsModule } from 'angular-cropperjs';

// post services


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    EmailverificationComponent,
    NotfoundComponent,
    MyProfileComponent,
    EditProfileComponent,
    PostsComponent,
    PostDetailsComponent,
    CreatePostComponent,
    UserPostsComponent,
    UserProfileComponent,
    ImageCropDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularCropperjsModule
  ],
  providers: [
    AuthServicesService,
  ],
  entryComponents: [ImageCropDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
