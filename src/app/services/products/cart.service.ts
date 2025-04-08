
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/authservice/auth.service';
import { CartUpdate } from '../../components/cart/cart.component';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/cart';
  private cartItems = new BehaviorSubject<any[]>([]); 
  cartItems$ = this.cartItems.asObservable(); 
 
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  
  constructor(private http: HttpClient,private authService: AuthService) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  addToCart(productId: string, quantity: number, size: string): Observable<any> {
    const body = { products: [{ productId, quantity, size }] };
    return this.http.post(`${this.apiUrl}`, body, this.getHeaders()).pipe(
      tap((response: any) => {
        if (response && response.data && response.data.cart) {
          const updatedCart = response.data.cart;
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
          this.cartItems.next(response.data.cart);
         this.cartCount.next(updatedCart.length);

        }
      })
    );
  }
  
  updateQuantity(productId: string, quantity: number, size: string): Observable<any> {
    const body = { products: [{ productId, quantity, size }] };
    return this.http.post(`${this.apiUrl}`, body, this.getHeaders());
  }

  getCartProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, this.getHeaders()).pipe(
      tap((response: any) => {
        if (response && response.data) {
          this.cartItems.next(response.data);
        }
      })
    );
  }

removeFromCart(productId: string, size: string): Observable<any> {
  const url = `${this.apiUrl}`;
  const body = { productId, size }; 
  return this.http.request('DELETE', url, { 
    headers: this.getHeaders().headers, 
    body 
  }).pipe(
    tap((response: any) => {
      if (response && response.data && response.data.cart) {
        const updatedCart = response.data.cart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        this.cartItems.next(updatedCart);
        this.cartCount.next(updatedCart.length);
      }
    })
  );
}

Checkout() {
  const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/checkout`, {},  { headers });
  }

  updatedCart(arr: CartUpdate[]): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}`, { updates: arr }, { headers });
  }
  
}


