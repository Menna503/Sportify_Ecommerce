import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signInPage=new FormGroup({
    // firstName: new FormControl('', [Validators.minLength(3), Validators.required]),
    // lastName: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    rememberMe: new FormControl(false) 
  });
  submitted = false;  

  onSubmit() {
    this.submitted=true
    if(this.signInPage.valid){
      console.log("done");
    }else{
      console.log("empty");
    }
  }
}
