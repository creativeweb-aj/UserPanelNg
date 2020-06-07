import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServicesService } from 'src/app/auth-services.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  responseData = {
    status: '',
    response: {},
    message: ''
  };

  editProfile = this.profileForm.group({
    profilePicField : new FormControl('', [
      Validators.required,
    ]),
    firstNameField : new FormControl('', [
      Validators.required,
    ]),
    lastNameField : new FormControl('', [
      Validators.required,
    ]),
    categoryField : new FormControl('', [
      Validators.required,
    ]),
    bioField : new FormControl('', [
      Validators.required,
    ]),
    contactInfoField : new FormControl('', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ]),
  })

  get profilePic(){
    return this.editProfile.get('profilePicField')
  }

  get firstName(){
    return this.editProfile.get('firstNameField')
  }

  get lastName(){
    return this.editProfile.get('lastNameField')
  }

  get category(){
    return this.editProfile.get('categoryField')
  }

  get bio(){
    return this.editProfile.get('bioField')
  }

  get contactInfo(){
    return this.editProfile.get('contactInfoField')
  }

  
  constructor(
    private Authguardservice: AuthServicesService,
    private profileForm: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    if (!this.Authguardservice.getToken()) {
      this.router.navigateByUrl("/login");
    }
  }

  imgUrl = '/assets/images/profilepic.png';
  profileImage = '';

  imageChangedEvent: any = '';

  uploadFile(file){
    if(file.target.files){
      this.profileImage = file.target.files[0];
      this.imageChangedEvent = file;
      
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgUrl = event.target.result;
        console.info(event)
      }
    }
  }


  // imageCropped(event: ImageCroppedEvent) {
  //   this.imgUrl = event.base64;
  // }
  // imageLoaded() {
  //   // show cropper
  // }
  // cropperReady() {
  //     // cropper ready
  // }
  // loadImageFailed() {
  //     // show message
  // }

  onSubmit(){
    debugger
    let url = "http://192.168.1.101:8000/auth/edit-profile/";
    let token = localStorage.getItem("UserToken");
    let header = new HttpHeaders(
      {'Authorization': 'token '+ token}
    );
    
    var formdata = new FormData();
    formdata.append('firstName', this.firstName.value)
    formdata.append('lastName', this.lastName.value)
    formdata.append('profilePic', this.profileImage)
    formdata.append('profession', this.category.value)
    formdata.append('bio', this.bio.value)
    formdata.append('contact', this.contactInfo.value)
    console.info(this.profileImage)

    this.http.post(url, formdata, {headers: header})
    .pipe(
      catchError(err => {
          this._snackBar.open(err.error.detail, 'Ok', {
            duration: 3000,
          });
          return throwError(err);
        })
    )
    .subscribe((response: any)=>{
      this.responseData = response;
      console.info(this.responseData)
      if(this.responseData.status == "SUCCESS"){

        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/profile']);
        });

      }else{

        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });

      }
    })
  }

}
