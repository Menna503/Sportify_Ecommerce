import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-women',
  imports: [HeaderComponent,MenCollectionComponent,ProductCardComponent],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent {
    src="assets/images/women_collection.svg"
}
