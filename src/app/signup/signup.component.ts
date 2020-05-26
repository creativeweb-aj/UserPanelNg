import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CustomValidationService} from './validator'
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private signUpForm: FormBuilder,
    private customValidator: CustomValidationService,
    private _snackBar: MatSnackBar) {
      // setting max date in date picker max current year
      const currentYear = new Date().getFullYear();
      this.maxDate = new Date(currentYear + 0, 11, 31);

    }

  ngOnInit() {
    
  }

  onSubmit(){
    console.info(this.signUp.value);
    this.openSnackBar();
  }

  openSnackBar(){
    let message = 'Account created Successfully';
    let action = 'Ok';
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
