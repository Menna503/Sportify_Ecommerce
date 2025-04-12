// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-forget-pass',
//   imports: [],
//   templateUrl: './forget-pass.component.html',
//   styleUrl: './forget-pass.component.css'
// })
// export class ForgetPassComponent {

// }

import { Component ,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { Router,RouterModule,ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,RouterModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent {
  // isvisble =false;
  // toggleEye(){
  //   this.isvisble=!this.isvisble
  // }
  forgotForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)]),
    // password: new FormControl('', [Validators.minLength(8), Validators.required]),
    rememberMe: new FormControl(false) 
  });
  submitted = false;  
  errorMsg:string='';

  constructor(private authService: AuthService ,private router: Router ,private route: ActivatedRoute,) {}

  onSubmit() {

    this.submitted=true
    if(this.forgotForm.valid){
   
      console.log("done");
      const email = this.forgotForm.value.email!;
      console.log(email);
      
      this.authService.forgotPassword(email).subscribe({
        next:()=>{
            // this.router.navigate(['/login'])
            console.log('success forget');
        },
        error:(err)=>{
           console.log(err);
        }
      })
      // this.authService.signin(this.forgotForm.value).subscribe({ 
      //   next:(response:any)=>{
      //     if(response.token){
     
      //       this.authService.saveTokenRole(response.token , response.data.user.role,response.data.user._id ,response.data.user.firstName ,response.data.user.email);
      //       console.log("user authenticated successfully");
      //       console.log(response);
      //       console.log(response.data.user);
        
      //       if (response.data.user.role === 'admin') {
      //         this.router.navigate(['/admin'], { replaceUrl: true });
      //       } else if (response.data.user.role === 'customer') {
      //         this.router.navigate(['/home'], { replaceUrl: true });
      //       } else {
      //         this.router.navigate(['/login']), { replaceUrl: true };
      //       }
      //       console.log(response.token , response.data.user.role);
            
      //     }else{
      //       console.log("invalid||missung token");
      //     }
      //   },
      //   error:(error:any)=>{
      //     console.error("faild" , error);
          
      //   this.errorMsg= error.error.message || "unexpected error";
          
      //   }                                                                                                                  
      // });
      
    }else{
      console.log("empty");
    }
  }
}
