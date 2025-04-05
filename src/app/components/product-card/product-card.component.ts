import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/products/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  standalone: true, 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  isHiddenPage: boolean = false; 
  @Input() data: any;
  @Input() isFav: boolean = false;
  @Output() removedFromFavorites = new EventEmitter<string>();
  
  selectedSize: string = 'sm'; // قيمة افتراضية للـ size
  selectedColor: string = '';
  
  // خاصية لتحديد إذا تمت عملية الإضافة
  isAdded: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.checkCurrentRoute();
    this.checkIfFavorite();
  }
  
  checkCurrentRoute() {
    const currentUrl = this.router.url; 
    this.isHiddenPage = currentUrl.includes('equipment') || currentUrl.includes('supplements');
  }
  
  checkIfFavorite() {
    this.favoritesService.getfavourite().subscribe({
      next: (favourites) => {
        this.isFav = favourites.some(fav => fav.id == this.data.id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleFav() {
    if (!this.isFav) {
      this.favoritesService.addFavorite(this.data).subscribe({
        next: () => {
          console.log(`${this.data.id} is added`);
          this.isFav = true;
        },
        error: (err) => console.error("Error while adding to favorites:", err)
      });
    } else {
      this.favoritesService.removeFavorite(this.data.id).subscribe({
        next: () => {
          console.log(`${this.data.id} is removed`);
          this.isFav = false;
          this.removedFromFavorites.emit(this.data.id);
        },
        error: (err) => {
          console.log(err);   
        }
      });
    }
  }

  addToCart() {
    if (!this.selectedSize) {
      console.error("Please select a size before adding to cart.");
      return;
    }

    this.cartService.addToCart(this.data._id, 1, this.selectedSize).subscribe(
      response => {
        console.log('Product added successfully:', response);
        // تعيين الحالة لتشير أنه تم الإضافة
        this.isAdded = true;
        // إعادة الحالة بعد 3 ثواني مثلاً
        setTimeout(() => {
          this.isAdded = false;
        }, 1000);
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }
}
