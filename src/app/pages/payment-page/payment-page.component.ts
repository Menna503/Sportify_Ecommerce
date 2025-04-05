import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { CartService } from '../../services/products/cart.service';
import { AuthService } from '../../services/auth/authservice/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-page',
  imports: [HeaderComponent ,FooterComponent,ReactiveFormsModule,RouterModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
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
      
      this.cartSub = this.cartService.cartItems$.subscribe((updatedCart) => {
        this.cartProducts = updatedCart;
        this.calculateTotal(); 
        this.cdr.detectChanges(); 
        if (this.cartProducts.length === 0) {
          console.log('✅ Cart is empty!');
        }
      }
    );
      this.authservice.getuser(this.user_id).subscribe({
        
       next:(data:any)=>{this.cartProducts = data.data.user.cart ,this.calculateTotal(),console.log(this.cartProducts)},
       
        error: (err) => console.log(err),
        complete: () => console.log('completed')
      });
    }
  
    calculateTotal() {
      this.totalPrice = this.cartProducts.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        const price = item.product?.price || 0;
  
        return acc + (Number(price) * quantity);
       
      }, 0);
    
      console.log("💰 total price:", this.totalPrice);
      
    }
    ngOnDestroy() {
      if (this.cartSub) {
        this.cartSub.unsubscribe();
      }
    }

  Form = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    card_num: new FormControl(null,[Validators.required,Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]),
    address: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)])
    
  })

  get EmailValid(){
    return this.Form.controls['email'].valid;
  }
  get NameValid(){
    return this.Form.controls['name'].valid;
  }
  get card_numValid(){
    return this.Form.controls['card_num'].valid;
  }
  get AddressValid(){
    return this.Form.controls['address'].valid;
  }
  submitted = false;
  submit(){
    this.submitted = true;
    if (this.Form.valid) {

      this.Form.markAllAsTouched(); 
      let newCheckout = {
        name: this.Form.get('name')?.value,
        email: this.Form.get('email')?.value,
        phone: this.Form.get('phone')?.value,
        address: this.Form.get('address')?.value

      }
   
    }
    return;
   
  }
  goToSuccess(){
    this.router.navigate(['/confirmPayment']);
  }

}
