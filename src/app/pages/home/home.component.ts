import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { ServicesComponent } from '../../components/services/services.component';
import { PartnersComponent } from '../../components/partners/partners.component';
import { RunningManComponent } from "../../components/running-man/running-man.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { CartComponent } from '../../components/cart/cart.component';
import { CartPageComponent } from '../cart-page/cart-page.component';

@Component({
  selector: 'app-home',

  imports: [HeaderComponent,ServicesComponent,FooterComponent,PartnersComponent, RunningManComponent, CategoriesComponent,CartPageComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
