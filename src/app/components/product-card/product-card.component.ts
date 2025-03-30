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
  addToCart() {
    this.cartService.addToCart(this.data); 
    this.router.navigate(['/cart']);
  }
}

