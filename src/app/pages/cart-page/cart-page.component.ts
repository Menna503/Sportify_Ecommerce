////////////////////////////////////////////////////////******************** */
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/products/cart.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../components/cart/cart.component';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, CartComponent, 
    
    ProductDetailsComponent,RouterModule],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartProducts: any[] = [];
  totalPrice: number = 0;
  user_id: string = localStorage.getItem('UserId') || "";
  cartSub!: Subscription;

  constructor(
    private cartService: CartService,
    private authservice: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    // الاشتراك في تحديثات الكارت
    this.cartSub = this.cartService.cartItems$.subscribe((updatedCart) => {
      this.cartProducts = updatedCart;
      this.calculateTotal(); // حساب المجموع فور التحديث
      this.cdr.detectChanges(); // إجبار Angular على تحديث العرض
      if (this.cartProducts.length === 0) {
        console.log('✅ Cart is empty!');

      }
      
    }
  );

    // جلب بيانات المستخدم (اختياري لو مطلوب)
    this.authservice.getuser(this.user_id).subscribe({
      
     next:(data:any)=>{this.cartProducts = data.data.user.cart ,console.log(this.cartProducts)}, 
      error: (err) => console.log(err),
      complete: () => console.log('completed')
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce((acc, item) => {
      const quantity = item.quantity || 1;
      const price = item.product?.price || 0;
      console.log("item:", item);
      return acc + (Number(price) * quantity);
    }, 0);
  
    console.log("💰 total price:", this.totalPrice);
    
  }
  ngOnDestroy() {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  checkout() {
    if (!this.user_id) {
      console.log('🚨 No user logged in!');
      this.router.navigate(['/login']); // إذا لم يكن المستخدم مسجلاً، اذهب إلى صفحة التسجيل
      return;
    }
    this.router.navigate(['/checkout']); // الانتقال إلى صفحة الشيك أوت
  }
}
/////////////////////////////////////////////////////////////////////////********** */

