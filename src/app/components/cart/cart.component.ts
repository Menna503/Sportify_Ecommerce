import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/products/favorites.service'; // إذا كنت تستخدم خدمة للمفضلة
import { CartService } from '../../services/products/cart.service'; // إذا كنت تستخدم خدمة للعربة

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() product: any;  
  @Output() quantityChanged = new EventEmitter<void>(); 
  @Output() productDeleted = new EventEmitter<string>();
  // @Output() productSaved = new EventEmitter<any>();

  constructor(
    private cartService: CartService 
  ) {}

  
  increaseQuantity() {
    this.product.quantity++;
    this.quantityChanged.emit(); 
  }


  decreaseQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.quantityChanged.emit(); 
    }
  }

 
  deleteProduct() {
    this.productDeleted.emit(this.product.id); 
  }

  
}