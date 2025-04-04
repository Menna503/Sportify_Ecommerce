import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/products/favorites.service'; // إذا كنت تستخدم خدمة للمفضلة
import { CartService } from '../../services/products/cart.service'; // إذا كنت تستخدم خدمة للعربة
import { FavComponent } from '../../pages/fav/fav.component';

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
 
  constructor(
    private cartService: CartService 
  ) {}

  ngOnInit() {
    console.log('Product quantity:', this.product.quantity);
  }
  
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
    // this.cartService.removeFromCart(this.product.id).subscribe(() => {
    //   this.productDeleted.emit(this.product.id);
    // });
  }
  updateQuantity(newValue: number) {
    const quantity = Math.max(1, +newValue);
    this.product.quantity = quantity;
    this.quantityChanged.emit();
    this.cartService.updateQuantity(this.product.id, this.product.quantity, this.product.selectedSize).subscribe(); 
  }



}

  // toggleFavorite() {
  //   this.favoritesService.toggleFavorite(this.product.id).subscribe(response => {
  //     console.log('Favorite status updated:', response);
  //   }); 
  // }