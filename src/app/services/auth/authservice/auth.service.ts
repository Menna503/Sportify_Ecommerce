import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl='http://127.0.0.1:8000/users'
  constructor(private http:HttpClient) { }

  signup(userData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,userData)
  }

  signin(crednatials:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/signin` , crednatials)
  }

  signout():void{
    localStorage.removeItem('token')
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('token')
  }

  getToken():String| null{
    return localStorage.getItem('token')
  }

  private getAuthHeaders():HttpHeaders{
    const Token =this.getToken();
    return new HttpHeaders({'Authorization':`Bearer ${Token}`})
  }
}
