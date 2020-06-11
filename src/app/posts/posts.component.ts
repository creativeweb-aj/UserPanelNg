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

}
