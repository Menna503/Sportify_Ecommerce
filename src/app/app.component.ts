import { Component, ErrorHandler } from '@angular/core';
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
import { CartComponent } from "./components/cart/cart.component";
import { ReviewcardComponent } from './components/reviewcard/reviewcard.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FavComponent } from './pages/fav/fav.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPaymentComponent } from './pages/confirm-payment/confirm-payment.component';
import { CheckOutComponent } from "./pages/check-out/check-out.component";
import { AdminComponent } from './pages/admin/admin.component';
import { GlobalErrorHandler } from './services/error_handler/error-service.service';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


@Component({
  selector: 'app-root',
  providers:[{ provide: ErrorHandler, useClass:GlobalErrorHandler  }],

  imports: [RouterOutlet,
   
      FavComponent,
     PaymentPageComponent, CheckOutComponent
     ,HomeComponent,
     MenComponent,
      WomenComponent,
       SuplementsComponent,
      FooterComponent,
       PartnersComponent, 
      HeaderComponent,
  ConfirmPaymentComponent
  ,FavComponent,PaginationComponent,
  HttpClientModule ,SignupPageComponent ,SigninComponent,
  CartComponent,PaymentPageComponent,AdminComponent,ProductDetailsComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sports';
}