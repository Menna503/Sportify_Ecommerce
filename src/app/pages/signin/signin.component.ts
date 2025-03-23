import { Component ,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  isvisble =false;
  toggleEye(){
    this.isvisble=!this.isvisble
  }
  signInPage=new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    rememberMe: new FormControl(false) 
  });
  submitted = false;  

  // private authService =inject(AuthService)
  constructor(private authService: AuthService ,private router: Router) {}
  
  onSubmit() {

    this.submitted=true
    if(this.signInPage.valid){
      console.log("done");
      this.authService.signin(this.signInPage.value).subscribe({ 
        next:(response:any)=>{
          if(this.authService.isAuthenticated()){
            // localStorage.setItem('token' , response.token)
            console.log("user authenticated successfully");
            this.router.navigate(['/home'])
          }else{
            console.log("invalid||missung token");
          }
        },
        error:(error:any)=>{
          console.error("faild" , error);
          
        }
      });
      
    }else{
      console.log("empty");
    }
  }
}
