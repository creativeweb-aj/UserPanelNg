import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import {AuthServicesService} from '../auth-services.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  responseData = {
    status: '',
    response: {},
    token: '',
    message: '',
    detail: ''
  };

  logIn = this.logInForm.group({
    emailFormControl : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl : new FormControl('', [
      Validators.required,
    ]),
  });

  get userEmail(){
    return this.logIn.get('emailFormControl')
  }

  get password() { 
    return this.logIn.get('passwordFormControl'); 
  }

  matcher = new MyErrorStateMatcher();
  
  constructor(
    private Authguardservice: AuthServicesService,
    private logInForm: FormBuilder, 
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    if (this.Authguardservice.getToken()) {  
      this.router.navigateByUrl("/");  
    }
  }

  onSubmit(){
    console.info(this.logIn.value);
    // get user data
    let url = "http://192.168.1.101:8000/auth/login/";
    let data = {
      "email": this.userEmail.value,
	    "password": this.password.value
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
        // set token in local storage
        localStorage.setItem('UserToken', this.responseData.token) 
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
    });
  }

 

}
