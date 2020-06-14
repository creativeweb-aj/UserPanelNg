import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  responseData = {
    status: '',
    response: {
      id: '',
      first_name: '',
      last_name: '',
      contact: '',
      profession: '',
      biography: '',
      profile_picture: '',
      follower: '',
      following: '',
      followed_by: [],
      isFollow: '',
      sameUser: ''
    },
    message: ''
  };

  imgUrl = 'assets/images/dummyprofile.png';
  userId: string;
  constructor(
    private profileService: ProfileServiceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.userProfile();
  }

  userProfile(){
    this.route.params.subscribe((params: Params) => this.userId = params['id']);

    let data = {
      'userId': this.userId
    }

    this.profileService.getUserProfile(data).subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == "SUCCESS"){
        if(this.responseData.response.sameUser){
          this.router.navigate(['/profile']);
        }else{
          if(this.responseData.response.profile_picture != null){
            this.imgUrl = this.responseData.response.profile_picture;
          }else{
            this.imgUrl = 'assets/images/dummyprofile.png';
          }
        }
      }
    })
  }


  followUser(){
    let data = {
      'userId': this.userId
    }
    this.profileService.followUnfollowUser(data).subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == 'SUCCESS'){
        document.getElementById('follower').textContent = this.responseData.response.follower;
        document.getElementById('following').textContent = this.responseData.response.following;
        if(this.responseData.response.isFollow){
          document.getElementById('follow').hidden = true;
          document.getElementById('unfollow').hidden = false;
        }else{
          document.getElementById('follow').hidden = false;
          document.getElementById('unfollow').hidden = true;
        }
      }
    })
  }

}
