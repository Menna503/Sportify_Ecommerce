import { RouterModule, Routes } from '@angular/router';
import { FavComponent } from './pages/fav/fav.component';
import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SuplementsComponent } from './pages/suplements/suplements.component';
import { WomenComponent } from './pages/women/women.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { Component, NgModule } from '@angular/core';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path:'login' ,component:SigninComponent},
    {path:'signup' ,component:SignupPageComponent},
    {path:'fav' ,component:FavComponent},
    {path:'men' ,component:MenComponent},
    {path:'women' ,component:WomenComponent},
    {path:'suplements' ,component:SuplementsComponent},
    {path:'product/:id',component:ProductDetailsComponent},
    {path:'payment',component:PaymentPageComponent},
    {path:'checkout',component:CheckOutComponent},
//cart page
{ path: 'cart', component: CartPageComponent }, 
//  for errors
{ path: 'error', component: ErrorComponent },
{ path: '**', redirectTo: 'error' },


];
//cart page
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}