import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReviewcardComponent } from '../../components/reviewcard/reviewcard.component';
import { CartComponent } from "../../components/cart/cart.component";

@Component({
  selector: 'app-product-details' , 
  imports: [HeaderComponent, FooterComponent, ReviewcardComponent, CartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

}
