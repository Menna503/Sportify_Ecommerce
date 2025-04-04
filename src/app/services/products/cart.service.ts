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
    return this.http.post(`${this.apiUrl}/add`, body, this.getHeaders()).pipe(
      tap((response: any) => {
        // تأكد إن الاستجابة فيها `data.cart`
        if (response && response.data && response.data.cart) {
          // احفظ البيانات في الـ localStorage
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
          console.log("✅ Cart saved to localStorage:", response.data.cart);
        }
      })
    );
  }

  
  updateQuantity(productId: string, quantity: number, size: string): Observable<any> {
    const body = { products: [{ productId, quantity, size }] };
    return this.http.post(`${this.apiUrl}/add`, body, this.getHeaders());
  }

  clearCart(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in localStorage.");
    }
  
    return this.http.post('http://127.0.0.1:8000/cart/checkout', {}, this.getHeaders()).pipe(
      tap(() => {
        localStorage.removeItem('cart');
      })
    );
  }


getCartProducts(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}`, this.getHeaders()).pipe(
    tap((response: any) => {
      // إذا كانت الاستجابة تحتوي على بيانات مُتداخلة (مثل response.data)
      if (response && response.data) {
        this.cartItems.next(response.data);
      }
    })
  );
}
}


  // addToCart(productId: string, quantity: number, size: string): Observable<any> {
  //   const body = { products: [{ productId, quantity, size }] };
  //   return this.http.post(`${this.apiUrl}/add`, body, this.getHeaders()).pipe(
  //     tap((response: any) => {
  //       if (response?.data?.cart) {
  //         // أضف بيانات المنتج الكاملة من الـ API
  //         const fullProductData = {
  //           ...response.data.cart,
  //           imageUrl: response.data.cart.imageUrl, // مباشرة من الاستجابة
  //           price: response.data.cart.price,
  //           size_range: response.data.cart.size_range
  //         };
  //         localStorage.setItem('cart', JSON.stringify(fullProductData));
  //       }
  //     })
  //   );
  // }



//   addToCart(productId: string, quantity: number, size: string): Observable<any> {
//     const body = { products: [{ productId, quantity, size }] };
//     return this.http.post(`${this.apiUrl}/add`, body, this.getHeaders()).pipe(
//        tap((response: any) => {
//           if (response?.data?.cart) {
//              // تحديث أو إعادة جلب بيانات العربة
//              const fullProductData = {
//                ...response.data.cart,
//                imageUrl: response.data.cart.imageUrl,
//                price: response.data.cart.price,
//                size_range: response.data.cart.size_range
//              };
//              // تأكد إنك بتخزن البيانات بشكل متوافق (مصفوفة)
//              let cart = JSON.parse(localStorage.getItem('cart') || '[]');
//              cart.push(fullProductData);
//              localStorage.setItem('cart', JSON.stringify(cart));
             
//              // تحديث العداد
//              this.cartCount.next(cart.length);
//           }
//        })
//     );
//  }
 
  // removeFromCart(productId: string): Observable<any> {  
  //   return this.http.post('http://127.0.0.1:8000/cart/checkout', {}, this.getHeaders()).pipe(
  //     tap(() => {
  //       localStorage.removeItem('cart');
  //       localStorage.removeItem('token')
  //     })
  //   );
  // }
