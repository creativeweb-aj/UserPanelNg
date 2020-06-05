import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

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

  
  constructor(private profileForm: FormBuilder) { 
    
  }

  ngOnInit(): void {
  }

  url = '/assets/images/profilepic.png';

  uploadFile(file){
    if(file.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
  }

  onSubmit(){

  }

}
