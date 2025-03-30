

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   brand: string;
//   imageUrl: string;
//   category?: any;
//   subCategory?: any;
//   gender?: string;
//   stock?: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = "http://127.0.0.1:8000/products";
  
//   constructor(private http: HttpClient) {}

//   getProduct(filter: { [key: string]: any } = {}): Observable<Product[]> {
//     let params = new HttpParams();
    
  
//     for (let key in filter) {
//       if (filter[key] !== undefined && filter[key] !== null) {
//         params = params.set(key, filter[key]);
//       }
//     }

   
//     return this.http.get<{ data: { products: Product[] } }>(this.apiUrl, { params })
//       .pipe(
//         map(response => response.data.products) 
//       );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/authservice/auth.service';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  imageUrl: string;
  category?: any;
  subCategory?: any;
  gender?: string;
  stock?: number;
} 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://127.0.0.1:8000/products";
  // private Urlproducts="http://127.0.0.1:8000/products/productID/reviews";
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProduct(filter: { [key: string]: any } = {}, page: number = 1, limit: number = 8): Observable<{ products: Product[], total: number }> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);
  
    for (let key in filter) {
      if (filter[key] !== undefined && filter[key] !== null) {
        params = params.set(key, filter[key]);
      }
    }
  
    return this.http.get<{ status: string, results: number, numProducts: number, data: { products: Product[] } }>(this.apiUrl, { params })
      .pipe(
        map(response => ({
          products: response.data.products,
          total: response.numProducts // ✅ استخدم `numProducts` بدلاً من `total`
        }))
      );
  }

  

  getProductById(_id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${_id}`);
  }
  getReviewsById(_id: string) {
    return this.http.get(`${this.apiUrl}/${_id}/reviews`);
  }

  addNewReview(_id: string, review: any) {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${_id}/reviews`, review, { headers });
  }
  addNewCheckout(Checkout: any) {
    return this.http.post(this.apiUrl,Checkout); 
  }
}



