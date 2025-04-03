import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/products/cart.service';
// !اضافه سما عشان ال logout
import { AuthService } from '../../services/auth/authservice/auth.service';
import { Router } from '@angular/router';
///
@Component({
  selector: 'app-header',
  imports: [CommonModule ,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // !اضافه سما عشان ال logout
  data:any
  show:string='hidden'
  ishidden:boolean=false;
   token:string|null=null;
  //  خاصه بالكارد
   cartItemCount: number = 0;
  //  
  constructor(private cartService: CartService,private authService:AuthService ,private router:Router){
    this.token=localStorage.getItem('token');
     console.log(this.token);
  }
 

  toggel() {
    this.show = this.show === 'hidden' ? 'block' : 'hidden';
  }
  
  getProfile(){
  //  this.ishidden=this.ishidden==='hidden'?'block':'hidden';
  this.ishidden=!this.ishidden
  }
  //  خاص بالكارد
  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      console.log('Updated cart count:', count); // للتأكد من التحديث
      this.cartItemCount = count;
    });
  }
 // !اضافه سما عشان ال logout
  logout(){
    this.authService.signout();
    this.router.navigate(['/login'], { replaceUrl: true })
    localStorage.removeItem('cart'); // مسح بيانات السلة من التخزين المحلي
    this.cartService.clearCart(); // تحديث الكارت في الخدمة بحيث يرجّع القيمة لـ 0
  } 
}





  

  
  