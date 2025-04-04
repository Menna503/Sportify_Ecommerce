import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/cart';
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  // دالة getHeaders لضبط الهيدرز مع التوكن
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  /**
   * addToCart:
   * - بيرسل طلب POST لـ API (http://127.0.0.1:8000/cart/add) مع بيانات المنتج:
   *    productId, quantity, size, userId
   * - بعد النجاح، بيخزن بيانات السلة (اللي جت في response.data.cart) في localStorage
   */
  addToCart(productId: string, quantity: number, size: string, userId: string): Observable<any> {
    const body = { productId, quantity, size, userId };
    return this.http.post(`${this.apiUrl}/add`, body, this.getHeaders()).pipe(
      tap((response: any) => {
        if (response && response.data && response.data.cart) {
          // حفظ بيانات السلة في localStorage باستخدام مفتاح userId_cart
          localStorage.setItem(`${userId}_cart`, JSON.stringify(response.data.cart));
          console.log("✅ Cart saved to localStorage:", response.data.cart);
          
          // تحديث عدد العناصر في السلة
          const totalCount = response.data.cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
          this.cartCount.next(totalCount);
        } else {
          console.error("Response structure is not as expected:", response);
        }
      })
    );
  }

  /**
   * getCartFromLocalStorage:
   * - بترجع بيانات السلة من localStorage باستخدام مفتاح userId_cart
   */
  getCartFromLocalStorage(userId: string): any[] {
    const cart = localStorage.getItem(`${userId}_cart`);
    return cart ? JSON.parse(cart) : [];
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
