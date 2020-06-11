import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PostService } from '../post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  responseData = {
    status: '',
    response: {
      title: '',
      content: '',
      postImage: '',
      hashTag: ''
    },
    message: ''
  };

  createPost = this.createPostForm.group({
    titleField : new FormControl('', [
      Validators.required,
    ]),
    contentField : new FormControl('', [
      Validators.required,
    ]),
    postImageField : new FormControl('', [
      Validators.required,
    ]),
    hashTagField : new FormControl('', [
      Validators.required,
    ])
  })

  get title(){
    return this.createPost.get('titleField')
  }

  get content(){
    return this.createPost.get('contentField')
  }

  get postImage(){
    return this.createPost.get('postImageField')
  }

  get hashTag(){
    return this.createPost.get('hashTagField')
  }

  constructor(
    private createPostForm: FormBuilder,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  imgUrl = 'assets/images/profilepic.png';
  postFile: any;

  imageChangedEvent: boolean = false ;

  uploadFile(file){
    if(file.target.files){
      this.postFile = file.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgUrl = event.target.result;
        this.imageChangedEvent = true;
      }
    }
  }

  onSubmit(){
    let formData = new FormData();
    formData.append('title', this.title.value)
    formData.append('content', this.content.value)
    formData.append('postImage', this.postFile)
    formData.append('hashTag', this.hashTag.value)
    this.postService.createPost(formData)
    .pipe(
      catchError(err => {
          this._snackBar.open(err.error.detail, 'Ok', {
            duration: 3000,
          });
          return throwError(err);
        })
    )
    .subscribe((res: any)=>{
      this.responseData = res;
      console.info(this.responseData);
      if(this.responseData.status == "SUCCESS"){
        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/']);
        });
      }else{
        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });
      }
    })
  }

}
