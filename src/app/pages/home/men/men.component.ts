import { Component } from '@angular/core';
import { MenCollectionComponent } from '../../../components/men-collection/men-collection.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';

@Component({
  selector: 'app-men',
  imports: [MenCollectionComponent,HeaderComponent,ProductCardComponent],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {

}
