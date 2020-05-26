import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

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

  constructor(private logInForm: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.info(this.logIn.value);
    this.openSnackBar();
  }

  openSnackBar(){
    let message = 'Login Successfully';
    let action = 'Ok';
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
