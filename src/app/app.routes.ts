import { RouterModule, Routes } from '@angular/router';
import { FavComponent } from './pages/fav/fav.component';
import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SuplementsComponent } from './pages/suplements/suplements.component';
import { WomenComponent } from './pages/women/women.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { Component, NgModule } from '@angular/core';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { ShoesComponent } from './pages/shoes/shoes.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ErrorComponent } from './pages/error/error.component';
import { GuardService } from './services/auth/authGaurd/guard.service';
import { ConfirmPaymentComponent } from './pages/confirm-payment/confirm-payment.component';
import { AdminAddProductComponent } from './components/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './components/admin-edit-product/admin-edit-product.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { ResetPassComponent } from './pages/reset-pass/reset-pass.component';


export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home' , component:HomeComponent },
    {path:'login' ,component:SigninComponent},
    {path:'signup' ,component:SignupPageComponent},
    {path:'fav' ,component:FavComponent ,canActivate:[GuardService]},
    {path:'men' ,component:MenComponent},
    {path:'women' ,component:WomenComponent},
    {path:'equipment',component:EquipmentComponent},
    {path:'product/:id',component:ProductDetailsComponent,canActivate:[GuardService]},
    {path:'payment',component:PaymentPageComponent,canActivate:[GuardService]},
    {path:'checkout',component:CheckOutComponent,canActivate:[GuardService]},
    {path:'shoes',component:ShoesComponent},
    {path:'supplements' ,component:SuplementsComponent},
    { path: 'cart', component: CartPageComponent,canActivate:[GuardService] }, 
    { path: 'confirmPayment', component: ConfirmPaymentComponent }, 
     { path: 'admin', component: AdminAddProductComponent, canActivate: [GuardService] },
     { path: 'admin-edit/:id', component: AdminEditProductComponent },
       { path: 'error', component: ErrorComponent },
       { path: 'forgetPass', component: ForgetPassComponent },
       { path: 'reset-password/:token', component: ResetPassComponent },
     { path: '**', redirectTo: 'error' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',  
        anchorScrolling: 'enabled'            
      })],
      
    exports: [RouterModule],
  })
  export class AppRoutingModule {}