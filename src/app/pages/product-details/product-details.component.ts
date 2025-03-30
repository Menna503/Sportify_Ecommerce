import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReviewcardComponent } from '../../components/reviewcard/reviewcard.component';

@Component({
  selector: 'app-product-details' , 
  imports: [HeaderComponent, FooterComponent, ReviewcardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

}
