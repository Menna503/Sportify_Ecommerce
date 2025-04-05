
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/cart';
  private cartItems = new BehaviorSubject<any[]>([]); // تعريف BehaviorSubject
  cartItems$ = this.cartItems.asObservable(); // Observable للاشتراك
 
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  
  constructor(private http: HttpClient) {}

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
          const updatedCart = response.data.cart; // اعرف المتغير ده
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
          this.cartItems.next(response.data.cart);
            // تحديث عداد الكارت
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
//! to remove item
//! To remove an item using the DELETE request with a body
removeFromCart(productId: string, size: string): Observable<any> {
  const url = `${this.apiUrl}`; // endpoint for removing product
  const body = { productId, size }; // body containing productId and size
  // Use HttpClient.request with DELETE method to send a request with a body
  return this.http.request('DELETE', url, { 
    headers: this.getHeaders().headers, 
    body 
  }).pipe(
    tap((response: any) => {
      // Assuming the response returns the updated cart
      if (response && response.data && response.data.cart) {
        const updatedCart = response.data.cart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        this.cartItems.next(updatedCart);
        this.cartCount.next(updatedCart.length);
      }
    })
  );
}
}


