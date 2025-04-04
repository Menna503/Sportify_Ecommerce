import { Injectable } from '@angular/core';
import { AuthService } from '../authservice/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private authService:AuthService ,private router:Router) { }

  canActivate():boolean{
     const role =this.authService.getRole();
     if(!role){
      this.router.navigate(['/login'])
      return false;
     }

     if (role === 'admin') {
      return true;
    } else if (role === 'customer') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    //  return true;
  }
}