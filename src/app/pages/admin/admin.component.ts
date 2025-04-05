import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',

})


@Injectable({
  providedIn: 'root'
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  apiUrl = 'http://127.0.0.1:8000/products'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts(); 
  }

  
  getProducts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.products = data; 
    });
  }


  addProduct(): void {
    const newProduct = { name: 'New Product', price: 100, category: 'example' };
    this.http.post(this.apiUrl, newProduct).subscribe(() => {
      this.getProducts(); 
    });
  }

 
  editProduct(id: string): void {
    const updatedProduct = { name: 'Updated Product', price: 150 };
    this.http.patch(`${this.apiUrl}/${id}`, updatedProduct).subscribe(() => {
      this.getProducts(); 
    });
  }


  deleteProduct(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getProducts();
    });
  }



}
