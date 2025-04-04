import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesService } from '../../services/favorites/favorites.service';

import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/products/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() data:any
  @Input() isFav:boolean=false;
  @Output() removedFromFavorites = new EventEmitter<string>();
   
    
    constructor(private cartService: CartService, private router: Router,private favoritesService:FavoritesService) {}

    ngOnInit(){
      this.checkIfFavorite();
    }

    checkIfFavorite(){
      this.favoritesService.getfavourite().subscribe({
        next:(favourits)=>{
          this.isFav=favourits.some(fav=>fav.id == this.data.id)
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    toggleFav(){
      // this.isFav=!this.isFav
      if(!this.isFav){
        this.favoritesService.addFavorite(this.data).subscribe({
          next:()=>{
            console.log(`${this.data.id} is added`)
            this.isFav=true
          },
            error: (err) => console.error("Error while removing from favorites:", err)
        });
        
      }else{
        this.favoritesService.removeFavorite(this.data.id).subscribe({
          next:()=>{
            console.log(`${this.data.id} is removed`)
            this.isFav=false;
            this.removedFromFavorites.emit(this.data.id);
          },
          error:(err)=>{
              console.log(err);   
          }
        })
      }
}

  selectedSize: string = 'sm'; // Add selectedSize attribute
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