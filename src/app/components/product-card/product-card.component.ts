import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CartService } from '../../services/products/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterModule,FormsModule],
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
  selectedSize: string = '';
  selectedColor: string = '';
 
  addToCart() {
    if (!this.selectedSize ) {
      alert('Please select size and color');
      return;
    }
  
    const userId = localStorage.getItem('userId')!;
    this.cartService.addToCart(this.data._id, 1, this.selectedSize, userId).subscribe(
      response => {
        console.log('Product added successfully:', response);
        alert('Product added to cart!');
      },
      error => {
        console.error('Error adding product:', error);
        alert('Error adding product to cart');
      }
    );
  }
  
}
