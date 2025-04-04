import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/products/cart.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../components/cart/cart.component';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-cart-page',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, CartComponent,ProductDetailsComponent],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  cartProducts: any ;
  totalPrice: number = 0;
   user_id: string = localStorage.getItem('UserId')|| "";
  constructor(private cartService: CartService,private authservice:AuthService) {}
  

  ngOnInit() {
    // this.cartProducts = this.cartService.getCartProducts(); 
    // this.calculateTotal(); 
    this.loadCartProducts();
    this.loadCartFromLocalStorage();

    this.authservice.getuser(this.user_id).subscribe({
      next:(data:any)=>{this.cartProducts = data.data.user.cart ,console.log(this.cartProducts)},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log("completed")}
     });
  }
  

  // ngOnInit() {
  //   this.cartService.getCartProducts().subscribe((apiProducts: any[]) => {
  //     this.cartProducts = apiProducts.map(p => ({
  //       ...p,
  //       selectedSize: 'XL', // حجم افتراضي
  //       quantity: 1
  //     }));
  //     // this.calculateTotal();
  //   });
  // }



  loadCartFromLocalStorage() {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      this.cartProducts = JSON.parse(cartString);
    } else {
      this.cartProducts = [];
    }
    // this.calculateTotal();
  }
  
  
  
  loadCartProducts() {
    // this.cartProducts = this.cartService.getCartProducts();
    // this.calculateTotal();
  }


  }

 
  // deleteProduct(productId: string) {
  //   // this.cartService.removeFromCart(productId);
  //   this.calculateTotal(); 
  //   this.loadCartProducts();
    
  // }