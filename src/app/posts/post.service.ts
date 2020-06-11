import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import {Posts} from './posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(){
    let Url: string = 'http://192.168.1.101:8000/secure/posts';
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.get<Posts[]>(Url, {headers: header});
  }

  getPostDetail(postId){
    let Url: string = 'http://192.168.1.101:8000/secure/post-detail';
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    let data = {
      "postId": parseInt(postId)
    }
    return this.http.post(Url, data, {headers: header});
  }

  createPost(data){
    let Url: string = 'http://192.168.1.101:8000/secure/create-post'
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(Url, data, {headers: header});
  }

}
