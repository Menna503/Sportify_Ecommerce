import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from "./pages/home/home.component";
import { MenComponent } from "./pages/men/men.component";
import { WomenComponent } from './pages/women/women.component';
import { SuplementsComponent } from './pages/suplements/suplements.component';
import { FooterComponent } from './components/footer/footer.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ReviewcardComponent } from './components/reviewcard/reviewcard.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FavComponent } from './pages/fav/fav.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent ,SignupPageComponent ,SigninComponent,MenComponent,WomenComponent,SuplementsComponent,FooterComponent,PartnersComponent,PaginationComponent,FavComponent,ProductDetailsComponent,PaymentPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sports';
}
