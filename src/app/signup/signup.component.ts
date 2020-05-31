import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {CustomValidationService} from './validator'
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServicesService } from '../auth-services.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  emailId = '';
  responseData = {
    status: '',
    response: {
        id: '',
        email: '',
    },
    message: ''
  };

  signUp = this.signUpForm.group({
    emailFormControl : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstNameFormControl : new FormControl('', [
      Validators.required,
    ]),
    lastNameFormControl : new FormControl('', [
      Validators.required,
    ]),
    dateofBirthFormControl : new FormControl('', [
      Validators.required,
    ]),
    passwordFormControl : new FormControl('', [
      Validators.required,
    ]),
    confirmPasswordFormControl : new FormControl('', [
      Validators.required,
    ])
  },
  {
    validator: this.customValidator.passwordMatchValidator(
      "passwordFormControl",
      "confirmPasswordFormControl"
    )
  });

  
  get userEmail(){
    return this.signUp.get('emailFormControl')
  }

  get firstName(){
    return this.signUp.get('firstNameFormControl')
  }

  get lastName(){
    return this.signUp.get('lastNameFormControl')
  }

  get dateOfBirth(){
    return this.signUp.get('dateofBirthFormControl')
  }

  get password() { 
    return this.signUp.get('passwordFormControl'); 
  }

  get confirmPassword() {
    return this.signUp.get("confirmPasswordFormControl");
  }

  matcher = new MyErrorStateMatcher();

  maxDate: Date;

  constructor(
    private Authguardservice: AuthServicesService,
    private signUpForm: FormBuilder,
    private customValidator: CustomValidationService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router) {
      // setting max date in date picker max current year
      const currentYear = new Date().getFullYear();
      this.maxDate = new Date(currentYear + 0, 11, 31);

    }

  ngOnInit() {
    if (this.Authguardservice.getToken()) {  
      this.router.navigateByUrl("/");  
    }
  }

  onSubmit(){
    console.info(this.signUp.value);
    let timestamp = (new Date(this.dateOfBirth.value)).getTime() / 1000;
    console.info(timestamp);
    let url = "http://192.168.1.101:8000/auth/register/";
    let data = {
      "first_name": this.firstName.value,
      "last_name": this.lastName.value,
      "email": this.userEmail.value,
      "password": this.password.value,
      "password2": this.confirmPassword.value,
      "date_of_birth": timestamp
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
      console.info(this.responseData)
      if(this.responseData.status == "SUCCESS"){

        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
            this.router.navigate(['/verification', this.responseData.response.id]);
        });

      }else{

        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });

      }
    })

    
  }


}
