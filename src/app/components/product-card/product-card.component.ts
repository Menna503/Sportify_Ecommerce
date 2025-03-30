import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesService } from '../../services/favorites/favorites.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() data:any
  @Input() isFav:boolean=false;
   
    constructor(private favoritesService:FavoritesService){}
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
            this.isFav=false
          },
          error:(err)=>{
              console.log(err);   
          }
        })
      }
     }
  
   
}
