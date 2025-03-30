import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];

  // دالة لإضافة منتج إلى المفضلة
  addToFavorites(product: any) {
    this.favorites.push(product);
  }

  // دالة لجلب المنتجات المفضلة
  getFavorites() {
    return this.favorites;
  }
}