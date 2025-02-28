import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  allCategories: { name: string; img: string }[] = [
    { name: 'MAN', img: 'assets/images/man_categories.svg' },
    { name: 'WOMEN', img: 'assets/images/women_categories.svg' },
    { name: 'SHOES', img: 'assets/images/shoes_categories.svg' },
    { name: 'SUPPLEMENTS', img: 'assets/images/supplements_categorie.svg' },
    { name: 'EQUIPMENTS', img: 'assets/images/equipments.svg' },
  ];

  displayedCategories: { name: string; img: string }[] = [];

  firstElement: number = 0;
  itemsPerPage: number = window.innerWidth < 750 ? 1 : 3; // 🛠 تحديد عدد العناصر بناءً على الشاشة

  constructor() {
    this.updateDisplayedCategories();
    window.addEventListener('resize', () => {
      if(this.firstElement==this.allCategories.length-1&& window.innerWidth>750){this.moveLeft() ;this.moveLeft()}
      this.itemsPerPage = window.innerWidth < 750 ? 1 : 3;
      this.updateDisplayedCategories();
    });
  }

  updateDisplayedCategories(): void {
    this.displayedCategories = this.allCategories.slice(
      this.firstElement,
      this.firstElement + this.itemsPerPage
    );
  }

  moveRight(): void {
    if (this.firstElement + this.itemsPerPage < this.allCategories.length) {
    
      this.firstElement++;
      this.updateDisplayedCategories();
    }
  }

  moveLeft(): void {
    if (this.firstElement > 0) {
      this.firstElement--;
      this.updateDisplayedCategories();
    }
  }
}

