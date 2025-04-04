import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl='http://127.0.0.1:8000/users'
  constructor(private http:HttpClient, private router:Router) { }

  signup(userData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,userData)
  }

  signin(crednatials:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login` , crednatials)
  }

  signout():void{
    // localStorage.removeItem('token')
    // localStorage.removeItem('role')
    localStorage.clear();
    this.router.navigate(['/home']);

  }
  

  // isAuthenticated():boolean{
  //   return !!localStorage.getItem('token')
  // }

  saveTokenRole(token:string , role:string ,id:string ,fname:string ,email:string):void{
     localStorage.setItem('token' , token);
     localStorage.setItem('role' , role);
     localStorage.setItem('UserId' , id);
     localStorage.setItem('Fname' , fname);
     localStorage.setItem('Email' , email);
  }

  getToken():String| null{
    return localStorage.getItem('token')
  }

  getRole():String| null{
    return localStorage.getItem('role') || '';
  }

  isAdmin():boolean{
     return this.getRole() ==='admin';
  }
  public getAuthHeaders():HttpHeaders{
    const Token =this.getToken();
    return new HttpHeaders({'Authorization':`Bearer ${Token}`})
  }
}
