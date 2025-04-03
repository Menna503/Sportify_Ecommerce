import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/products/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
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
selectedSize: string = ''; // Add selectedSize attribute
  selectedColor: string = '';
  sizes: string[] = ['S', 'M', 'L', 'XL']; // Example sizes

addToCart() {
  if (!this.selectedSize) {
    console.error("Please select a size before adding to cart.");
    return;
  }

  this.cartService.addToCart(this.data._id, 1, this.selectedSize).subscribe(
    response => {
      console.log('Product added successfully:', response);
    },
    error => {
      console.error('Error adding product:', error);
    }
  );
}
}