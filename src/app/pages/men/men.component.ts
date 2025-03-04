import { Component } from '@angular/core';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-men',
  imports: [MenCollectionComponent,HeaderComponent,ProductCardComponent,CommonModule],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {
src="assets/images/men_collection.svg";
isHidden:boolean=true;
toggelFilter(){
  this.isHidden=!this.isHidden;
}
}
