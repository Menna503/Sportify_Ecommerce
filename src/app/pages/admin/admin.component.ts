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
  products: any[] = []; // Array to store products
  apiUrl = 'http://127.0.0.1:8000/products'; // API URL for fetching products

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts(); // Fetch products when the page loads
  }

  // Function to fetch all products from the API
  getProducts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.products = data; // Store products in the array for display
    });
  }

  // Function to add a new product
  addProduct(): void {
    const newProduct = { name: 'New Product', price: 100, category: 'example' };
    this.http.post(this.apiUrl, newProduct).subscribe(() => {
      this.getProducts(); // Reload products after adding a new one
    });
  }

  // Function to update an existing product by ID
  editProduct(id: string): void {
    const updatedProduct = { name: 'Updated Product', price: 150 };
    this.http.patch(`${this.apiUrl}/${id}`, updatedProduct).subscribe(() => {
      this.getProducts(); // Reload products after update
    });
  }

  // Function to delete a product by ID
  deleteProduct(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getProducts(); // Reload products after deletion
    });
  }



}
