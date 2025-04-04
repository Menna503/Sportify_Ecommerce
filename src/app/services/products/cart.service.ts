import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}
  private cartProducts: any[] = []; 


  addToCart(product: any) {
    const existingProduct = this.cartProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartProducts.push({ ...product, quantity: 1 });
    }
  }
  // جلب المنتجات من العربة
  getCartProducts() {
    return this.cartProducts;
  }
 

  
  fetchCartItems(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('http://127.0.0.1:8000/cart', { headers });
  }
}
