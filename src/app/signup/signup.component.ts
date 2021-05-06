import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {CustomValidationService} from './validator'
import {MatSnackBar} from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private API_URL = environment.API_URL
  hide = true;


  public responseData = {
    status: '',
    keyId: '',
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
      Validators.pattern(/^[^\.][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
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


  maxDate: Date;

  constructor(
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
    
  }

  onSubmit(){
    console.info(this.signUp.value);
    let timestamp = (new Date(this.dateOfBirth.value)).getTime() / 1000;
    
    let url = this.API_URL+"/auth/register";
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
            this.router.navigate(['/verification', this.responseData.keyId]);
        });

      }else{

        this._snackBar.open(this.responseData.message, 'Ok', {
          duration: 3000,
        });

      }
    })
  }


}
