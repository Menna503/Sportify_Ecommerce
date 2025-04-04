import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReviewcardComponent } from '../../components/reviewcard/reviewcard.component';
import { CartComponent } from "../../components/cart/cart.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/products/product.service';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice/auth.service';

@Component({
  selector: 'app-product-details' , 
  standalone: true, 
  imports: [HeaderComponent, FooterComponent, ReviewcardComponent,ReactiveFormsModule,FormsModule, CartComponent,CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers:[ProductService]
})

export class ProductDetailsComponent implements OnInit {
 
  ID:string = '';
constructor(private authService: AuthService,activatedRoute:ActivatedRoute ,private productService:ProductService,router: Router){
  this.ID =activatedRoute.snapshot.params['id'];
}
    
   products:any;
   reviews: any;
  ngOnInit(): void {
    this.productService.getProductById(this.ID).subscribe({
     next:(data)=>{this.products = data ,console.log(this.products)},
     error:(err)=>{console.log(err)},
     complete:()=>{console.log("completed")}
    });

    
    this.productService.getReviewsById(this.ID).subscribe({
      next: (data: any) => {
        this.reviews = data?.data?.reviews || []; 
        console.log("Reviews:", this.reviews);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Reviews fetch completed");
      }
    });
  }



  Form = new FormGroup({
    user: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    reviewerEmail: new FormControl(null,[Validators.required,Validators.email]),
    review: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    rating: new FormControl(null,[Validators.required]),
    
  })
  get EmailValid(){
    return this.Form.controls['reviewerEmail'].valid;
  }
  get NameValid(){
    return this.Form.controls['user'].valid;
  }
  get DescriptionValid(){
    return this.Form.controls['review'].valid;
  }
  get RateValid(){
    return this.Form.controls['rating'].valid;
  }
  rating: number = 1; 

   updateRating(value: number) {
     this.rating = value; 
   }

  submitted = false;
  @Output() myEvent = new EventEmitter();
  submit(){
    this.submitted =true;
    
    if (this.Form.valid) {
      const productId = this.ID;
      

      let newReview = {
        review: this.Form.get('review')?.value,
        rating: this.Form.get('rating')?.value 

      }

    
      this.productService.addNewReview(productId, newReview).subscribe({
        next: (response: any) => {
          console.log('Review added successfully', response);
          this.myEvent.emit(newReview);
          this.reviews.unshift(response.data);
          this.submitted =false;
          this.Form.reset();

          this.productService.getReviewsById(this.ID).subscribe({
            next: (data: any) => {
              this.reviews = data?.data?.reviews || [];
              console.log("Updated Reviews:", this.reviews);
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log('Error adding Review:', err);
        }
      });
    }else if(this.Form.valid){
      this.Form.markAllAsTouched(); 
      return;
    }
   
  }
}