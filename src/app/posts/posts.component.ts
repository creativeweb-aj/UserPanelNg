import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {Posts} from './posts';
import { AuthServicesService } from '../auth-services.service';
import { catchError } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  PostsData: Posts[];
  userPicture: string;
  liked: string = 'favorite';

  responseData = {
    status: '',
    response: {
      like: '',
      total: '',
      profile_picture: '',
      first_name: '',
      last_name: ''
    },
    message: ''
  };


  constructor(
    private appnavbarlogo: AppComponent,
    private postService: PostService, 
    private _snackBar: MatSnackBar,
    private router: Router,
    public Authguardservice: AuthServicesService) { }

  ngOnInit(): void {
    this.loadProfile();
    this.loadPosts();
  }

  loadPosts(){
    this.postService.getAllPosts().subscribe((res: any) => {
      console.info(res);
      this.PostsData = res;
    })
  }

  loadProfile(){
    this.postService.getCurrentProfile().subscribe((response: any)=>{
        this.responseData = response;
        if(this.responseData.status == "SUCCESS"){
          if(this.responseData.response.profile_picture != null){
            this.appnavbarlogo.profileImage = this.responseData.response.profile_picture;
            this.appnavbarlogo.userName = this.responseData.response.first_name+' '+this.responseData.response.last_name;
          }else{
            this.appnavbarlogo.profileImage = 'assets/images/dummyprofile.png';
          }
        }
    });
  }

  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

  likePost(postId){
    let data = {
      'postId': postId
    }
    this.postService.postLike(data).subscribe((res: any) => {
      this.responseData = res;
      console.info(this.responseData)
      if(this.responseData.response.like){
        document.getElementById('like-'+postId).textContent = 'favorite';
        document.getElementById('count-'+postId).textContent = this.responseData.response.total;
      }else{
        document.getElementById('like-'+postId).textContent = 'favorite_border';
        document.getElementById('count-'+postId).textContent = this.responseData.response.total;
      }
    });
  }

}
