// import { Injectable } from '@angular/core';
// import { HttpClient ,HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface product{
//   id?: number; 
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category?: string;
//   subCategory?: string;
//   gender?: string;
//   stock?: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl="http://127.0.0.1:8000/products";
  
//   constructor(private http:HttpClient) { }
  
//   getProduct(filter :{[key :string]:any}={}):Observable<product[]>{
//     // return this.http.get()
//     let params =new HttpParams();
//     for(let key in filter){
//        params =params.set(key ,filter[key])
//     }
//     return this.http.get<product[]>(this.apiUrl,{params})
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  
  constructor(private http: HttpClient) {}

  getProduct(filter: { [key: string]: any } = {}): Observable<Product[]> {
    let params = new HttpParams();
    
    // Add filters dynamically
    for (let key in filter) {
      if (filter[key] !== undefined && filter[key] !== null) {
        params = params.set(key, filter[key]);
      }
    }

    // Extract the products array from the response
    return this.http.get<{ data: { products: Product[] } }>(this.apiUrl, { params })
      .pipe(
        map(response => response.data.products) // Extract only the products array
      );
  }
}
