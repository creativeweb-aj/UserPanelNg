import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Posts} from './posts';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL = environment.API_URL
  constructor(
    private http: HttpClient,
    private router: Router) { }

  getCurrentProfile(){
    // get user data
    let url = this.API_URL+"/auth/profile";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.get(url, {headers: header}).pipe(
        catchError(err => {
          return throwError(err);
        })
      )
  }

  getAllPosts(data){
    let Url: string = this.API_URL+'/secure/posts';
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post<Posts[]>(Url, data, {headers: header}).pipe(
      catchError(err => {
        if(err.status == 401){
          localStorage.removeItem('UserToken')
          this.router.navigate(['/login']);
        } 
        return throwError(err);
      })
    )
  }

  getMyPosts(){
    let Url: string = this.API_URL+'/secure/my-posts';
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.get<Posts[]>(Url, {headers: header}).pipe(
      catchError(err => {
        if(err.status == 401){
          localStorage.removeItem('UserToken')
          this.router.navigate(['/login']);
        } 
        return throwError(err);
      })
    )
  }

  getPostDetail(postId){
    let Url: string = this.API_URL+'/secure/post-detail';
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    let data = {
      "postId": parseInt(postId)
    }
    return this.http.post(Url, data, {headers: header}).pipe(
      catchError(err => {
          if(err.status == 401){
            localStorage.removeItem('UserToken')
            this.router.navigate(['/login']);
          }
          return throwError(err);
        })
    )
  }

  createPost(data){
    let Url: string = this.API_URL+'/secure/create-post'
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(Url, data, {headers: header});
  }

  postLike(data){
    let Url: string = this.API_URL+'/secure/like-dislike-post'
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(Url, data, {headers: header});
  }

  postDelete(data){
    let Url: string = this.API_URL+'/secure/delete-post'
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    return this.http.post(Url, data, {headers: header});
  }

}
