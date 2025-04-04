import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '../../products/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/users';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) { 
    const savedToken = localStorage.getItem('token');
    const cart = localStorage.getItem('cart')



    if (savedToken) {
      this.tokenSubject.next(savedToken);
    }

    // اشتراك واحد في router.events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url===('/login') && savedToken &&cart && this.isAuthenticated()) {
        this.clearUserData();
      }
    });
  }

  private clearUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    // this.cartService.clearCart(); 
    
  }

 
  signout(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('userData');
    // this.cartService.clearCart();
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  validateToken(): boolean {
    return !!this.tokenSubject.value;
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  signin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
}