import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Posts } from '../posts';
import { AuthServicesService } from 'src/app/auth-services.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  PostsData: Posts[];
  userPicture: string;

  responseData = {
    status: '',
    response: {
      like: '',
      total: '',
      profile_picture: ''
    },
    message: ''
  };

  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public Authguardservice: AuthServicesService) { }

  ngOnInit(): void {
    this.loadUserPosts();
  }

  loadUserPosts(){
    this.postService.getMyPosts().subscribe((res: any) => {
      console.info(res);
      this.PostsData = res;
    })
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

  deletePost(postId){
    let data = {
      'postId': postId
    }
    this.postService.postDelete(data).subscribe((res: any) => {
      this.responseData = res;
      if(this.responseData.status == 'SUCCESS'){
        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/user-post']);
            this.loadUserPosts();
        });
      }
    });
  }


}
