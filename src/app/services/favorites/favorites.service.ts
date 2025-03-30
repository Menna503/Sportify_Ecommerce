import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favUrl="http://127.0.0.1:8000/favorites"
  constructor(private http:HttpClient) { }
  private getHeader():HttpHeaders{
    const token =localStorage.getItem('token')
    console.log(token);
    return new HttpHeaders({
      'Authorization':`Bearer ${token}`,
      'content-type':'application/json'
    });
  }
  
  getfavourite(): Observable<any[]> {
    return this.http.get<{ status: string; results: number; data: any[] }>(this.favUrl, { headers: this.getHeader() })
      .pipe(
        map(response => response.data) // استخراج `data` فقط
      );
  }
  
  
  // addFavorite(card:any):Observable<any>{
  //   return this.http.post<any>(`${this.favUrl}/add`, card,{headers:this.getHeader()})
  // }
  addFavorite(productId: string): Observable<any> {
    return this.http.patch<any>(`${this.favUrl}/add`, { productId }, { headers: this.getHeader() });
  }

  // removeFavorite(id:Number):Observable<any>{
  //   return this.http.delete<any>(`${this.favUrl}/${id}`,{headers:this.getHeader()})
  // }
  
  removeFavorite(productId: string): Observable<any> {
    return this.http.patch<any>(`${this.favUrl}/remove`, { productId }, { headers: this.getHeader() });
  }
  // isfav(id:Number):Observable{
     
  // }
}
