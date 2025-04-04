// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../../services/products/cart.service';
// import { FooterComponent } from '../../components/footer/footer.component';
// import { HeaderComponent } from '../../components/header/header.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CartComponent } from '../../components/cart/cart.component';

// @Component({
//   selector: 'app-cart-page',
//   imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, CartComponent],
//   templateUrl: './cart-page.component.html',
// })
// export class CartPageComponent implements OnInit {
//   cartProducts: any[] = [];
//   totalPrice: number = 0;

//   constructor(
//     private cartService: CartService,
//   ) {}

//   ngOnInit() {
//     // this.cartProducts = this.cartService.getCartProducts(); 
//     // this.calculateTotal(); 
//     this.loadCartProducts();
//     this.loadCartFromLocalStorage();
//   }
  

//   // ngOnInit() {
//   //   this.cartService.getCartProducts().subscribe((apiProducts: any[]) => {
//   //     this.cartProducts = apiProducts.map(p => ({
//   //       ...p,
//   //       selectedSize: 'XL', // حجم افتراضي
//   //       quantity: 1
//   //     }));
//   //     // this.calculateTotal();
//   //   });
//   // }



//   loadCartFromLocalStorage() {
//     const cartString = localStorage.getItem('cart');
//     if (cartString) {
//       this.cartProducts = JSON.parse(cartString);
//     } else {
//       this.cartProducts = [];
//     }
//     // this.calculateTotal();
//   }
  
//   // calculateTotal() {
//   //   this.totalPrice = this.cartProducts.reduce((sum, product) => {
//   //     return sum + product.quantity * (product.price || 0);
//   //   }, 0);
//   // }
  
//   loadCartProducts() {
//     // this.cartProducts = this.cartService.getCartProducts();
//     // this.calculateTotal();
//   }

//   // calculateTotal() {
//   //   console.log('Calculating total', this.cartProducts); // للتأكد من البيانات
//   //   this.totalPrice = this.cartProducts.reduce(
//   //     (sum, product) => sum + (product.price * (product.quantity || 1)),
//   //     0
//   //   );
//   }

 
//   // deleteProduct(productId: string) {
//   //   // this.cartService.removeFromCart(productId);
//   //   this.calculateTotal(); 
//   //   this.loadCartProducts();
    
//   // }
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/products/cart.service';
import { ProductService } from '../../services/products/product.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-cart-page',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, CartComponent],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  // مصفوفة مركبة تحتوي على بيانات السلة مع تفاصيل المنتج
  cartProducts: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.cartProducts = this.cartService.getCartFromLocalStorage(userId);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    console.log('Calculating total', this.cartProducts);
    this.totalPrice = this.cartProducts.reduce(
      (sum, product) => sum + (product.price * (product.quantity || 1)),
      0
    );
  }
}