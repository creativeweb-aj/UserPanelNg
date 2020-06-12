import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {Posts} from './posts';
import { AuthServicesService } from '../auth-services.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  PostsData: Posts[];
  userPicture: string;
  liked: boolean = false;

  responseData = {
    status: '',
    response: {
      like: '',
      total: ''
    },
    message: ''
  };


  constructor(private postService: PostService, public Authguardservice: AuthServicesService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.postService.getAllPosts().subscribe(res => {
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
    })
  }

}
