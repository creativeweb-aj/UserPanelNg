import { Component, OnInit } from '@angular/core';
import {PostService} from './post.service';
import {Posts} from './posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  PostsData: Posts[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    console.log(this.postService.getPosts);
    this.loadPosts();
  }

  loadPosts(){
    this.postService.getPosts().subscribe(res => {
      console.info(res);
      this.PostsData = res;
    })
  }

}
