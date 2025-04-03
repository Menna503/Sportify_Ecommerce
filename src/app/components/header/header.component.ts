import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule ,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  fname:string |null='' ;
  email:string |null='';
  show:string='hidden'
  ishidden:boolean=false;
   token:string|null=null;
  constructor(private authService:AuthService ,private router:Router){
    this.token=localStorage.getItem('token');
     console.log(this.token);
  }
  ngOnInit() {
       this.fname=localStorage.getItem('Fname');
       this.email=localStorage.getItem('Email')
  }

  toggel() {
    this.show = this.show === 'hidden' ? 'block' : 'hidden';
  }
  
  getProfile(){
  //  this.ishidden=this.ishidden==='hidden'?'block':'hidden';
  this.ishidden=!this.ishidden
  }

  logout(){
    this.authService.signout();
    this.router.navigate(['/login'], { replaceUrl: true })
  }
  
}
