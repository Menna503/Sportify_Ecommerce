import { Routes } from '@angular/router';
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
import { Component } from '@angular/core';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ErrorComponent } from './pages/error/error.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GuardService } from './services/auth/authGaurd/guard.service';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home' , component:HomeComponent , canActivate:[GuardService]},
    {path:'login' ,component:SigninComponent},
    {path:'signup' ,component:SignupPageComponent},
    {path:'fav' ,component:FavComponent},
    {path:'men' ,component:MenComponent},
    {path:'women' ,component:WomenComponent},
    {path:'suplements' ,component:SuplementsComponent},
    {path:'cart',component:CartComponent},
    {path:'product/:id',component:ProductDetailsComponent},
    {path:'payment',component:PaymentPageComponent},
    {path:'checkout',component:CheckOutComponent},
     { path: 'error', component: ErrorComponent },
     { path: '**', redirectTo: 'error' },
    {path:'admin',component:AdminComponent , canActivate:[GuardService]}

];
