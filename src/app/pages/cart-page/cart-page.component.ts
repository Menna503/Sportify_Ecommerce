import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/products/cart.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-cart-page',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, CartComponent],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  cartProducts: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts(); 
    this.calculateTotal(); 
  }

  
  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

 
  deleteProduct(productId: string) {
    this.cartProducts = this.cartProducts.filter(product => product.id !== productId);
    this.calculateTotal(); // إعادة حساب السعر الإجمالي بعد الحذف
  }

 
}