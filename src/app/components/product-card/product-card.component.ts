import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  isHiddenPage: boolean = false; 
  @Input() data: any;
  @Input() isFav: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.checkCurrentRoute();
  }

  checkCurrentRoute() {
    const currentUrl = this.router.url; 
    this.isHiddenPage = currentUrl.includes('equipment') || currentUrl.includes('supplements');
  }

  toggleFav() {
    this.isFav = !this.isFav;
  }
}
