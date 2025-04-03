import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-suplements',
  imports: [HeaderComponent, MenCollectionComponent, ProductCardComponent, FooterComponent],
  templateUrl: './suplements.component.html',
  styleUrl: './suplements.component.css'
})
export class SuplementsComponent {
src="assets/images/suplements_collection.svg"
}