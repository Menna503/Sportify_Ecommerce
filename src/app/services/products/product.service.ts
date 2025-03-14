import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface product{
  id?: number; 
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  subCategory?: string;
  gender?: string;
  stock?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl="http://127.0.0.1:8000/products";
  
  constructor(private http:HttpClient) { }
  
  getProduct(filter :{[key :string]:any}={}):Observable<product[]>{
    // return this.http.get()
    let params =new HttpParams();
    for(let key in filter){
       params =params.set(key ,filter[key])
    }
    return this.http.get<product[]>(this.apiUrl,{})
  }
}
