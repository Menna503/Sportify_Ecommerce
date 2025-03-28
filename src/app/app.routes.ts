import { Routes } from '@angular/router';
import { FavComponent } from './pages/fav/fav.component';
import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SuplementsComponent } from './pages/suplements/suplements.component';
import { WomenComponent } from './pages/women/women.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path:'login' ,component:SigninComponent},
    {path:'signup' ,component:SignupPageComponent},
    {path:'fav' ,component:FavComponent},
    {path:'men' ,component:MenComponent},
    {path:'women' ,component:WomenComponent},
    {path:'suplements' ,component:SuplementsComponent},
    {path:'cart',component:CartComponent}
];
