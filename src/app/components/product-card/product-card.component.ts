import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CartService } from '../../services/products/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() data:any
  @Input() isFav:boolean=false;
   toggleFav(){
    this.isFav=!this.isFav
   }



      
// !cart page
constructor(private cartService: CartService, private router: Router) {}
  selectedSize: string = 'xl'; // Add selectedSize attribute
  selectedColor: string = '';
 
  addToCart() {
    if (!this.selectedSize) {
      console.error("Please select a size before adding to cart.");
      return;
    }
  
    this.cartService.addToCart(this.data._id, 1, this.selectedSize).subscribe(
      response => {
        console.log('Product added successfully:', response);
        // ممكن كمان تضيف نافذة تأكيد للمستخدم
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }
  
}