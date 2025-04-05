import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-payment-page',
  imports: [HeaderComponent ,FooterComponent,ReactiveFormsModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
 constructor(private productsService: ProductService,private router: Router) {} 
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

}
