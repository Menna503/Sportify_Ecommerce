import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router ,RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,RouterModule], 
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  signUpPage = new FormGroup({
    firstName: new FormControl('', [Validators.minLength(3), Validators.required]),
    lastName: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    rememberMe: new FormControl(false) // ✅ تصحيح `rememberMe`
  });
  constructor(private router:Router){}
  submitted = false; // ✅ حتى نتمكن من التحكم في ظهور الأخطاء

  onSubmit() {

    // this.submitted = true; // ✅ حتى تظهر الأخطاء بعد الضغط على `Submit`

    if (this.signUpPage.invalid) {
      this.signUpPage.markAllAsTouched(); // ✅ إجبار جميع الحقول على التفاعل مع الأخطاء
      return;
    }
      
  
    this.submitted=true
    if(this.signUpPage.valid){
      console.log("done");
      this.router.navigate(["/login"])
    }else{
      console.log("empty");
    }

    console.log('Form submitted successfully', this.signUpPage.value);
  }
}
