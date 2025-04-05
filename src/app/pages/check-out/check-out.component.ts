import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductService } from '../../services/products/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [FooterComponent ,HeaderComponent,ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  constructor(private productsService: ProductService,private router: Router) {} 
  Form = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null,[Validators.required,Validators.minLength(11), Validators.maxLength(11),Validators.pattern(/^\d{11}$/)]),
    address: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)])
    
  })

  get EmailValid(){
    return this.Form.controls['email'].valid;
  }
  get NameValid(){
    return this.Form.controls['name'].valid;
  }
  get PhoneValid(){
    return this.Form.controls['phone'].valid;
  }
  get AddressValid(){
    return this.Form.controls['address'].valid;
  }
  submitted = false;
  submit() {
    this.submitted = true;
    console.log('Form validity:', this.Form.valid);
  
    if (this.Form.valid) {
      this.Form.markAllAsTouched(); 
      console.log('Form values:', this.Form.value);

      this.router.navigate(['/payment']);
      console.log('Form is valid, navigating to payment...');
    } else {
      console.log('Form is invalid. Please fill in all required fields correctly.');
    }
  }
   
  
  goToCheckout() {
    this.router.navigate(['/checkout']);
    console.log('Navigating back to checkout...');
  }
 

}
