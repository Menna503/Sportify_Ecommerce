import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/authservice/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router 
  ) {}

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
        map(response => {
          if (!response.data.products || response.data.products.length === 0) {
            throw new Error('No products found');
          }
          return {
            products: response.data.products,
            total: response.numProducts
          };
        }),
       
        catchError((error) => this.handleError(error))  
      );
  }

  private handleError(error: HttpErrorResponse) {
  
    console.error('Error occurred:', error);
    const errorMessage = error.message || 'Something went wrong!';
    this.router.navigate(['/error'], {
      state: { errorMessage }
    });


    return throwError(() => new Error(errorMessage));
  }

  getProductById(_id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${_id}`).pipe(
      catchError((error) => this.handleError(error)) 
    );
  }

  getReviewsById(_id: string) {
    return this.http.get(`${this.apiUrl}/${_id}/reviews`).pipe(
      catchError((error) => this.handleError(error)) 
    );
  }

  addNewReview(_id: string, review: any) {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${_id}/reviews`, review, { headers }).pipe(
      catchError((error) => this.handleError(error)) 
    );
  }

  addNewCheckout(Checkout: any) {
    return this.http.post(this.apiUrl, Checkout).pipe(
      catchError((error) => this.handleError(error)) 
    );
  }
}
