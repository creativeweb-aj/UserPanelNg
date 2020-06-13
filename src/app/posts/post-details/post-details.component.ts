import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  result = {
    status: '',
    response: {
        id: '',
        title: '',
        content: '',
        post_image: '',
        hash_tag: '',
        likes: '',
        liked_by: [],
        isLiked: '',
        created_on: '',
        created_by: {
          id: '',
          profile_picture: '',
          first_name: '',
          last_name: ''
        }
    },
    message: ''
  };

  responseData = {
    status: '',
    response: {
      like: '',
      total: ''
    },
    message: ''
  };


  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postDetailView();
    console.info(this.result);
  }

  myParam: string;
  postDetailView(){
    // get param user id
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.postService.getPostDetail(this.myParam).subscribe((res: any) => {
      this.result = res;
    })
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
  
  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

}
