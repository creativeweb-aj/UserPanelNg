import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServicesService } from '../../auth-services.service';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {

  responseData = {
    status: '',
    response: {
        id: '',
        email: '',
    },
    message: ''
  };

  otpVerification = this.otpVerificationForm.group({
    otpFormControl : new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ])
  });

  get otp(){
    return this.otpVerification.get('otpFormControl')
  }

  myParam: string;
  email: string;

  constructor(
    private Authguardservice: AuthServicesService,
    private otpVerificationForm: FormBuilder, 
    private _snackBar: MatSnackBar, 
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.Authguardservice.getToken()) {  
      this.router.navigateByUrl("");  
    }

    // get param user id
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    console.info(this.myParam);

    // get user data
    let url = "http://192.168.1.101:8000/auth/userdata/";
    let data = {
      "userId": this.myParam
    };
    
    this.http.post(url, data)
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
      if(this.responseData.status == "SUCCESS"){
        console.info(this.responseData);
        this.email = this.responseData.response.email;
      }
    });

  }

  userId = this.router.parseUrl['id']
  
  onSubmit(){
    let url = "http://192.168.1.101:8000/auth/verification/";
    let data = {
      "emailId": this.email,
      "otp": this.otp.value
    };
    debugger
    this.http.post(url, data)
    .pipe(
      catchError(err => {
          this._snackBar.open(err.error.detail, 'Ok', {
            duration: 3000,
          });
          return throwError(err);
        })
    )
    .subscribe((response: any)=>{
      debugger
      this.responseData = response;
      if(this.responseData.status == "SUCCESS"){
        console.info(this.responseData);

        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/login']);
        });

      }else{
        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });
      }
    });

  }

 

}