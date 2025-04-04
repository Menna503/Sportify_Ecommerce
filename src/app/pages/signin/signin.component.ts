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
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    rememberMe: new FormControl(false) 
  });
  submitted = false;  
  errorMsg:string='';
  // private authService =inject(AuthService)
  constructor(private authService: AuthService ,private router: Router) {}
  
  onSubmit() {

    this.submitted=true
    if(this.signInPage.valid){
      // console.log("✅ Sent credentials:", this.signInPage.value);
      console.log("done");
      this.authService.signin(this.signInPage.value).subscribe({ 
        next:(response:any)=>{

          if(this.authService.isAuthenticated()){
            // localStorage.setItem('token' , response.token)
            console.log("user authenticated successfully");

          if(response.token){
            // localStorage.setItem('token' , response.token)
            this.authService.saveTokenRole(response.token , response.data.user.role,response.data.user._id ,response.data.user.firstName ,response.data.user.email);
            console.log("user authenticated successfully");
            console.log(response);

            console.log(response.data.user);
            // this.router.navigate(['/home'])
            // this.router.navigate(['/']);
            // if(response.data.user.role ==='admin'){
            //   console.log('admin');
            //   this.router.navigate(['/admin'])
            //  }else if(response.data.user.role ==='customer'){
            //   console.log('cust');
            //   this.router.navigate(['/home'])
            //  }else{
            //   console.log('login');
            //   this.router.navigate(['/login'])
            //  }
            if (response.data.user.role === 'admin') {
              this.router.navigate(['/admin'], { replaceUrl: true });
            } else if (response.data.user.role === 'customer') {
              this.router.navigate(['/home'], { replaceUrl: true });
            } else {
              this.router.navigate(['/login']), { replaceUrl: true };
            }
            console.log(response.token , response.data.user.role);
            

            this.router.navigate(['/home'])

          }else{
            console.log("invalid||missung token");
          }
        },
        error:(error:any)=>{
          console.error("faild" , error);
          
        this.errorMsg= error.error.message || "unexpected error";
          
        }
      });
      
    }else{
      console.log("empty");
    }
  }
}