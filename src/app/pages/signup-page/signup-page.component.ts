import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  signUpPage = new FormGroup({
    firstName: new FormControl('', [Validators.minLength(3), Validators.required]),
    lastName: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    rememberMe: new FormControl(false) 
  });

  submitted = false;  

  onSubmit() {
    this.submitted=true
    if(this.signUpPage.valid){
      console.log("done");
    }else{
      console.log("empty");
    }
  }
}
