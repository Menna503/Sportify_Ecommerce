import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../components/cart/cart.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-cart-page',
  imports: [
    FormsModule,
    CommonModule,
    CartComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
 // size selected
 sizes = ['XL', '2XL', '3XL', '4XL', '5XL'];
 selectedSize = 'XL'; 
 // color selected
 colors=['Blue','Red'];
 selectedColor ='Blue'

 // + or - 
 increaseQuantity(event: Event) {
   let inputElement = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;
   if (inputElement) {
     inputElement.stepUp();
   }
 }
 
 decreaseQuantity(event: Event) {
   let inputElement = (event.target as HTMLElement).nextElementSibling as HTMLInputElement;
   if (inputElement) {
     inputElement.stepDown();
   }
 }
  

}

// ! 🎯 Goal: Make sure each (+) and (-) button only controls its own input field without affecting other products.
/*
✅ Solution:
  - Used `$event.target` to identify the clicked button.
  - `previousElementSibling` gets the input field when clicking (+).
  - `nextElementSibling` gets the input field when clicking (-).
  - Used `stepUp()` and `stepDown()` to directly increase or decrease the value.
  - No need for `ngModel`, keeping each product independent.

🔹 Result: Each product remains separate, and quantity adjustments do not interfere with other items.
*/
//

