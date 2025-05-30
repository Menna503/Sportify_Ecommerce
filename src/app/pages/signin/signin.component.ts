import { Component ,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { Router,RouterModule,ActivatedRoute, } from '@angular/router';

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
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    rememberMe: new FormControl(false) 
  });
  submitted = false;  
  errorMsg:string='';

  constructor(private authService: AuthService ,private router: Router ,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        console.log("✅ Token from Google:", token);
        localStorage.setItem('token', token);
    
      }
    });
  }


  signUpWithGoogle() {
    window.location.href = 'http://localhost:8000/auth/google';
  }
  onSubmit() {

    this.submitted=true
    if(this.signInPage.valid){
   
      console.log("done");
      this.authService.signin(this.signInPage.value).subscribe({ 
        next:(response:any)=>{
          if(response.token){
     
            this.authService.saveTokenRole(response.token , response.data.user.role,response.data.user._id ,response.data.user.firstName ,response.data.user.email);
            console.log("user authenticated successfully");
            console.log(response);
            console.log(response.data.user);
        
            if (response.data.user.role === 'admin') {
              this.router.navigate(['/admin'], { replaceUrl: true });
            } else if (response.data.user.role === 'customer') {
              this.router.navigate(['/home'], { replaceUrl: true });
            } else {
              this.router.navigate(['/login']), { replaceUrl: true };
            }
            console.log(response.token , response.data.user.role);
            
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