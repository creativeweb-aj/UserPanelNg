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
        created_on: '',
        created_by: ''
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
  
  convertInt(timestamp){
    return parseInt(timestamp) * 1000;
  }

}
