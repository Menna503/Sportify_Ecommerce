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
      this.productsService.addNewCheckout(newCheckout).subscribe({
        next: () => {
          console.log('Checkout added successfully');
          this.Form.reset();
          this.router.navigate(['/payment']);
        },
        error: (err) => {
          console.log('Error adding Checkout:', err);
        }
      });
    }
    return;
   
  }

}